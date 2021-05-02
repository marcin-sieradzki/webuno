import { ref, computed } from "vue";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import { Game, Player } from "@/Types";

interface Card {
  id: string;
}
const connection = ref(null);
const internalGameKey = ref("");
const internalPlayerName = ref("");
const player = ref<Player>(null);
const game = ref<Game>(null);
const buildConnection = () => {
  const newConnection = new HubConnectionBuilder()
    // .withUrl("https://webuno-api.azurewebsites.net/gamehub")
    .withUrl("https://localhost:44384/gamehub")
    .configureLogging(LogLevel.Information)
    .build();

  connection.value = newConnection;
};
const isConnected = computed(() => (connection.value ? true : false));

const connect = async () => {
  buildConnection();
  await connection.value.start();
};

const disconnect = async () => {
  await connection.value.stop();
};

const startGame = async (playerName: string) => {
  try {
    if (!isConnected.value) {
      buildConnection();
      await connect();
    }

    const newGame: Game = await connection.value.invoke(
      "StartGame",
      playerName
    );
    game.value = newGame;
  } catch (e) {
    throw new Error(e);
  }
};

const joinGame = async (gameKey: string, playerName: string) => {
  try {
    if (!isConnected.value) {
      buildConnection();
      await connect();
    }
    await connection.value.invoke("JoinGame", gameKey, playerName);
    game.value.key = gameKey;
    player.value.name = playerName;
  } catch (e) {
    throw new Error(e);
  }
};

const playCard = async (gameKey: string, playerName: string, card: Card) => {
  await connection.value.invoke("PlayCard", gameKey, playerName, card);
};

const registerListener = (eventName: string, callback: Function) => {
  connection.value.on(eventName, (data) => {
    callback(data);
  });
};

const test = async () => {
  await axios
    .post(
      `https://localhost:44384/api/game/${getPlayerName().value}/${
        connection.value.connection.connectionId
      }`
    )
    .then((data) => {
      console.log(data);
      return data;
    });
};

const getGameKey = () => {
  return game.value.key;
};
const getPlayerName = () => {
  return player.value.name;
};
const useGameConnection = {
  connection,
  connect,
  disconnect,
  startGame,
  joinGame,
  playCard,
  registerListener,
  getGameKey,
  getPlayerName,
  test,
};

export default useGameConnection;
