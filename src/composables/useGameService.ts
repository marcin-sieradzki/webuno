import { HubResponse } from '../Types';
import { useHubConnection } from './useHubConnection';
import { ref, computed, Ref } from 'vue';
import { Game, Player } from '@/Types';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { sharedRef } from '@/utils/shared/useSharedRef';

const { connection } = useHubConnection();

const apiUrl = 'https://webuno-api.azurewebsites.net/api';
const $game = ref<Game | null>(null);

export const useGameService = () => {
  const loading: Ref<boolean> = sharedRef('useGame-loading', false);
  const error: Ref<UseGameErrors> = sharedRef('useGame-error', { startGame: null, refreshGame: null });
  const route = useRoute();

  const startGame = async (playerName: string, gameName: string): Promise<Game> => {
    try {
      loading.value = true;
      const newGame: Game = await connection.value.invoke('StartGame', playerName, gameName);
      return newGame;
    } catch (e) {
      error.value.startGame = e;
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const joinGame = async ({ gameKey, playerName }: JoinGameParams): Promise<Game> => {
    try {
      loading.value = true;
      const joinedGame: Game = await connection.value.invoke('JoinGame', gameKey, playerName);
      return joinedGame;
    } catch (e) {
      error.value = e;
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const refreshGame = async (game: Game): Promise<void | Error> => {
    loading.value = true;
    try {
      const fetchedGame = await fetchGame(game.key);
      $game.value = fetchedGame;
    } catch (e) {
      error.value.fetchGame = e;
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchGame = async (key: string): Promise<Game> => {
    try {
      const fetchedGame: HubResponse<Game> = await axios.get(`${apiUrl}/game/${key}`);
      return fetchedGame.data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const setGame = (game: Game) => {
    $game.value = game;
  };

  const winner = computed(() => {
    const winnerId = $game.value?.winnerId;
    return winnerId ? $game.value.players.find((player) => player.key == winnerId) : null;
  });

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

  return {
    player: computed(() =>
      $game.value?.players?.find((player: Player) => player.name === localStorage.getItem(`${route.params.gameKey}`))
    ),
    players: computed(() =>
      $game?.value?.players?.sort((currentPlayer, nextPlayer) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
    ),
    currentTurn: computed(() => $game?.value?.currentPlayerTurn),
    playedCards: computed(() => $game?.value?.cardsPlayed || []),
    game: computed(() => $game.value),
    disconnectFromGame,
    refreshGame,
    startGame,
    fetchGame,
    joinGame,
    setGame,
    loading,
    error,
    winner: computed(() => winner.value),
  };
};

interface UseGameErrors {
  startGame: Error;
  fetchGame: Error;
}

interface JoinGameParams {
  gameKey: string;
  playerName: string;
}
