import { HubResponse } from "./../Types";
import { useHubConnection } from "./useHubConnection";
import { ref, computed, Ref } from "vue";
import { Game, Player, Card } from "@/Types";
import axios from "axios";
import { useRoute } from "vue-router";

const { isConnected, buildHubConnection, connectToHub, connection } =
  useHubConnection();
const player = ref<Player | null>(null);
const game = ref<Game | null>(null);
const isPlayingCard = ref<boolean>(false);
const apiUrl = "https://webuno-api.azurewebsites.net/api";
// const apiUrl = "https://localhost:44384/api";

export const useGame = () => {
  const route = useRoute();
  const startGame = async (playerName: string): Promise<boolean> => {
    try {
      if (!isConnected.value) {
        buildHubConnection();
        await connectToHub();
      }

      const newGame: Game = await connection.value.invoke(
        "StartGame",
        playerName
      );

      updateGameData(game, newGame);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const joinGame = async (
    gameKey: string,
    playerName: string
  ): Promise<boolean> => {
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
      updateGameData(game, joinedGame);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const playCard = async (
    gameKey: string,
    playerName: string,
    card: Card
  ): Promise<boolean> => {
    try {
      await connection.value.invoke("PlayCard", gameKey, playerName, card);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const drawCard = async (playerName: string, game: Game): Promise<Game> => {
    try {
      const freshGame: Game = await connection.value.invoke(
        "DrawRandomCard",
        playerName,
        game
      );
      return freshGame;
    } catch (e) {
      throw new Error(e);
    }
  };

  const fetchGame = async (key): Promise<Game> => {
    try {
      const fetchedGame: HubResponse<Game> = await axios.get(
        `${apiUrl}/game/${key}`
      );
      return fetchedGame.data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const refreshGame = async (): Promise<void | Error> => {
    try {
      const fetchedGame = await fetchGame(game.value.key);
      game.value = fetchedGame;
    } catch (e) {
      throw new Error(e);
    }
  };

  const disconnectFromGame = async (): Promise<boolean> => {
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

  function updateGameData(game: Ref<Game>, newGame: Game) {
    game.value = newGame;
  }
  return {
    player: computed(() =>
      game.value.players.find(
        (player: Player) => player.name === route.params.playerName.toString()
      )
    ),
    game: computed(() => game.value),
    startGame,
    joinGame,
    playCard,
    disconnectFromGame,
    // appendPlayer,
    players: computed(() =>
      game?.value?.players.sort((currentPlayer, nextPlayer) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
    ),
    currentTurn: computed(() => game?.value?.currentPlayerTurn),
    playedCards: computed(() => game?.value?.cardsPlayed || []),
    refreshGame,
    fetchGame,
    drawCard,
    isPlayingCard: computed(() => isPlayingCard.value),
  };
};
