import { useHubConnection } from "./useHubConnection";
import { ref, computed, Ref } from "vue";
import { Game, Player, Card } from "@/Types";
import axios from "axios";

const { isConnected, buildHubConnection, connectToHub, connection } =
  useHubConnection();
const player = ref<Player | null>(null);
const game = ref<Game | null>(null);
const players = ref<Player[]>(null);
const apiUrl = "https://localhost:44384/api";

export const useGame = () => {
  const startGame = async (playerName: string): Promise<boolean | Error> => {
    try {
      if (!isConnected.value) {
        buildHubConnection();
        await connectToHub();
      }

      const newGame: Game = await connection.value.invoke(
        "StartGame",
        playerName
      );

      updateGameData(game, newGame, player, playerName);
      players.value = [...newGame.players];
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const joinGame = async (
    gameKey: string,
    playerName: string
  ): Promise<boolean | Error> => {
    try {
      if (!isConnected.value) {
        buildHubConnection();
        await connectToHub();
      }

      const joinedGame: Game = await connection.value.invoke(
        "JoinGame",
        gameKey,
        playerName
      );

      updateGameData(game, joinedGame, player, playerName);
      players.value = [...joinedGame.players];

      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const playCard = async (
    gameKey: string,
    playerName: string,
    card: Card
  ): Promise<boolean | Error> => {
    try {
      await connection.value.invoke("PlayCard", gameKey, playerName, card);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const fetchGame = async (key): Promise<Game | Error> => {
    try {
      const fetchedGame: Game = await axios.get(`${apiUrl}/game/${key}`);
      return fetchedGame;
    } catch (e) {
      throw new Error(e);
    }
  };

  const disconnectFromGame = async (): Promise<boolean | Error> => {
    try {
      await connection.value.invoke(
        "DisconnectFromGame",
        game.value.key,
        player.value.name
      );
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };
  const appendPlayer = (playerToAppend: Player) => {
    debugger;
    if (
      players?.value?.some(
        (player) => player?.key.toString() === playerToAppend.key.toString()
      )
    ) {
      players.value = players.value.map((p) =>
        p.key.toString() === playerToAppend.key.toString() ? playerToAppend : p
      );
      return;
    }
    players.value = players.value?.length
      ? [...players.value, playerToAppend]
      : [playerToAppend];
  };

  function updateGameData(
    game: Ref<Game>,
    newGame: Game,
    player: Ref<Player>,
    playerName: string
  ) {
    if (!game.value) {
      game.value = newGame;
    }
    player.value = game.value.players.find(
      (player: Player) => player.name === playerName
    );
  }
  return {
    player: computed(() => player.value),
    game: computed(() => game.value),
    startGame,
    joinGame,
    playCard,
    disconnectFromGame,
    appendPlayer,
    players: computed(() => players.value),
    fetchGame,
  };
};
