import { useFetcher } from '@/composables/useFetcher';
import { HubResponse } from './../Types';
import { useHubConnection } from './useHubConnection';
import { ref, computed, Ref, reactive, toRefs, toRef } from 'vue';
import { Game, Player, Card } from '@/Types';
import axios from 'axios';
import { useRoute } from 'vue-router';

const { isConnected, buildHubConnection, connectToHub, connection } =
  useHubConnection();

const apiUrl = 'https://webuno-api.azurewebsites.net/api';
const game = ref<Game | null>(null);
const joinGameState = reactive({ isJoiningGame: false, joinGameError: null });
const drawCardState = reactive({ isDrawingCard: false, drawCardError: null });
const playCardState = reactive({ isPlayingCard: false, playCardError: null });
const refreshGameState = reactive({
  isRefreshingGame: false,
  refreshGameError: null,
});
const startGameState = reactive({
  isStartingGame: false,
  startGameError: null,
});

interface PlayCardParams {
  gameKey: string;
  playerName: string;
  card: Card;
}
interface DrawCardParams {
  playerName: string;
  game: Game;
}
interface JoinGameParams {
  gameKey: string;
  playerName: string;
}

export const useGame = () => {
  const route = useRoute();
  const startGame = async (playerName: string): Promise<boolean> => {
    try {
      startGameState.isStartingGame = true;
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
      startGameState.startGameError = true;
      throw new Error(e);
    } finally {
      startGameState.isStartingGame = false;
    }
  };
  async function joinGame({ gameKey, playerName }: JoinGameParams) {
    try {
      joinGameState.isJoiningGame = true;
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
      return joinedGame;
    } catch (e) {
      joinGameState.joinGameError = e;
    } finally {
      joinGameState.isJoiningGame = false;
    }
  }

  const playCard = async ({ gameKey, playerName, card }: PlayCardParams) => {
    playCardState.isPlayingCard = true;
    try {
      const playedCard = await connection.value.invoke(
        'PlayCard',
        gameKey,
        playerName,
        card
      );
      return playedCard;
    } catch (e) {
      playCardState.playCardError = e;
    } finally {
      playCardState.isPlayingCard = false;
    }
  };
  const drawCard = async ({ playerName, game }: DrawCardParams) => {
    drawCardState.isDrawingCard = true;
    try {
      const drawnCard = await connection.value.invoke(
        'DrawRandomCard',
        playerName,
        game
      );
      return drawnCard;
    } catch (e) {
      drawCardState.drawCardError = e;
    } finally {
      drawCardState.isDrawingCard = false;
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
    refreshGameState.isRefreshingGame = true;
    try {
      const fetchedGame = await fetchGame(game.value.key);
      game.value = fetchedGame;
    } catch (e) {
      refreshGameState.refreshGameError = e;
      throw new Error(e);
    } finally {
      refreshGameState.isRefreshingGame = false;
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
    players: computed(() =>
      game?.value?.players?.sort((currentPlayer, nextPlayer) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
    ),
    game: computed(() => game.value),
    currentTurn: computed(() => game?.value?.currentPlayerTurn),
    playedCards: computed(() => game?.value?.cardsPlayed || []),
    startGame,
    disconnectFromGame,
    refreshGame,
    fetchGame,
    drawCard,
    playCard,
    joinGame,
    ...toRefs(drawCardState),
    ...toRefs(playCardState),
    ...toRefs(joinGameState),
    ...toRefs(startGameState),
  };
};
