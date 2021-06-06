import { HubResponse } from './../Types';
import { useHubConnection } from './useHubConnection';
import { ref, computed, Ref, reactive, toRefs } from 'vue';
import { Game, Player, Card } from '@/Types';
import axios from 'axios';
import { useRoute } from 'vue-router';

const { isConnected, buildHubConnection, connectToHub, connection } =
  useHubConnection();
const game = ref<Game | null>(null);

const apiUrl = 'https://webuno-api.azurewebsites.net/api';

interface PlayCardParams {
  gameKey: string;
  playerName: string;
  card: Card;
}
interface DrawCardParams {
  playerName: string;
  game: Game;
}

export const useGame = () => {
  const route = useRoute();
  const startGame = async (playerName: string): Promise<boolean> => {
    try {
      if (!isConnected.value) {
        buildHubConnection();
        await connectToHub();
      }

      const newGame: Game = await connection.value.invoke(
        'StartGame',
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
        'JoinGame',
        gameKey,
        playerName
      );
      updateGameData(game, joinedGame);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const playCardFetcher = async ({
    gameKey,
    playerName,
    card,
  }: PlayCardParams) => {
    return await connection.value.invoke('PlayCard', gameKey, playerName, card);
  };
  const drawCardFetcher = async ({ playerName, game }: DrawCardParams) => {
    return await connection.value.invoke('DrawRandomCard', playerName, game);
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

  const disconnectFromGame = async () => {
    // try {
    //   await connection.value.invoke(
    //     'DisconnectFromGame',
    //     game.value.key,
    //     player.value.name
    //   );
    //   return true;
    // } catch (e) {
    //   throw new Error(e);
    // }
  };

  function updateGameData(game: Ref<Game>, newGame: Game) {
    game.value = newGame;
  }
  return {
    player: computed(() =>
      game.value?.players?.find(
        (player: Player) => player.name === route?.params?.playerName.toString()
      )
    ),
    game: computed(() => game.value),
    startGame,
    joinGame,

    disconnectFromGame,
    players: computed(() =>
      game?.value?.players?.sort((currentPlayer, nextPlayer) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
    ),
    currentTurn: computed(() => game?.value?.currentPlayerTurn),
    playedCards: computed(() => game?.value?.cardsPlayed || []),
    refreshGame,
    fetchGame,
    drawCardFetcher,
    playCardFetcher,
  };
};
