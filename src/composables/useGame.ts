import { usePlayerSeats } from './usePlayerSeats';
import { HubResponse } from '../Types';
import { useHubConnection } from './useHubConnection';
import { ref, computed, Ref } from 'vue';
import { Game, Player } from '@/Types';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { calculatePositions } from '@/composables/usePlayerSeats';
const { connection } = useHubConnection();

const apiUrl = 'https://webuno-api.azurewebsites.net/api';
const $game = ref<Game | null>(null);

export const useGame = () => {
  const loading: Ref<UseGameLoaders> = sharedRef('useGame-loading', {
    startGame: false,
    joinGame: false,
    fetchGame: false,
  });
  const error: Ref<UseGameErrors> = sharedRef('useGame-error', { startGame: null, fetchGame: null, joinGame: null });
  const route = useRoute();

  const player = computed(() =>
    $game.value?.players?.find((player: Player) => player.name === localStorage.getItem(`${route.params.gameKey}`))
  );

  const players = computed(() =>
    $game?.value?.players
      ?.sort((currentPlayer: Player, nextPlayer: Player) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
      .map((p: Player) => {
        const positions = calculatePositions(p, player.value);
        return { ...p, positions: positions };
      })
  );

  const startGame = async (playerName: string, gameName: string): Promise<Game> => {
    try {
      error.value.startGame = null;
      loading.value.startGame = true;
      const newGame: Game = await connection.value.invoke('StartGame', playerName, gameName);
      return newGame;
    } catch (e) {
      error.value.startGame = e;
      throw new Error(e);
    } finally {
      loading.value.startGame = false;
    }
  };

  const joinGame = async ({ gameKey, playerName }: JoinGameParams): Promise<Game> => {
    try {
      error.value.joinGame = null;
      loading.value.joinGame = true;
      const joinedGame: Game = await connection.value.invoke('JoinGame', gameKey, playerName);
      return joinedGame;
    } catch (e) {
      error.value = e;
      throw new Error(e);
    } finally {
      loading.value.joinGame = false;
    }
  };

  const fetchGame = async (game: Game): Promise<Game> => {
    try {
      error.value.fetchGame = null;
      loading.value.fetchGame = true;
      const fetchedGame: HubResponse<Game> = await axios.get(`${apiUrl}/game/${game.key}`);
      return fetchedGame.data;
    } catch (e) {
      error.value.fetchGame = e;
      throw new Error(e);
    } finally {
      loading.value.fetchGame = false;
    }
  };

  const setGame = (game: Game) => {
    $game.value = game;
  };

  const winner = computed(() => {
    const winnerId = $game.value?.winnerId;
    return winnerId ? $game.value.players.find((player: Player) => player.key == winnerId) : null;
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
    player,
    players,
    currentTurn: computed(() => $game?.value?.currentPlayerTurn),
    playedCards: computed(() => $game?.value?.cardsPlayed || []),
    game: computed(() => $game.value),
    disconnectFromGame,
    fetchGame,
    startGame,
    joinGame,
    setGame,
    loading,
    error,
    winner: computed(() => winner.value),
  };
};

interface UseGameLoaders {
  startGame: boolean;
  joinGame: boolean;
  fetchGame: boolean;
}

interface UseGameErrors {
  startGame: Error | null;
  joinGame: Error | null;
  fetchGame: Error | null;
}

interface JoinGameParams {
  gameKey: string;
  playerName: string;
}
