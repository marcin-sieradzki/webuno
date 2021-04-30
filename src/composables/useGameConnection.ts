import { ref, computed } from "vue";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

interface Card {
  id: string;
}
const connection = ref(null);
const internalGameKey = ref("");
const internalPlayerName = ref("");

const buildConnection = () => {
  const newConnection = new HubConnectionBuilder()
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

const startGame = async (gameKey: string) => {
  try {
    if (!isConnected.value) {
      buildConnection();
      await connect();
    }
    await connection.value.invoke("StartGame", gameKey);
    internalGameKey.value = gameKey;
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
    internalGameKey.value = gameKey;
    internalPlayerName.value = playerName;
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

const getGameKey = () => {
  return internalGameKey;
};
const getPlayerName = () => {
  return internalPlayerName;
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
};

export default useGameConnection;
