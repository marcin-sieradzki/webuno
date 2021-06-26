import { HubResponse } from './../Types';
import { useHubConnection } from './useHubConnection';
import { ref, computed, Ref, reactive, toRefs, toRef } from 'vue';
import { Game, Player, Card } from '@/Types';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { sharedRef } from '@/utils/shared/useSharedRef';

const { connection } = useHubConnection();

const apiUrl = 'https://webuno-api.azurewebsites.net/api';
const $game = ref<Game | null>(null);

export const useGame = () => {
  const loading: Ref<boolean> = sharedRef('useGame-loading', false);
  const error: Ref<UseGameErrors> = sharedRef('useGame-error', { startGame: null, refreshGame: null });
  const route = useRoute();

  const startGame = async (playerName: string): Promise<Game> => {
    try {
      loading.value = true;
      const newGame: Game = await connection.value.invoke('StartGame', playerName);
      return newGame;
    } catch (e) {
      error.value.startGame = e;
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchGame = async (key): Promise<Game> => {
    try {
      const fetchedGame: HubResponse<Game> = await axios.get(`${apiUrl}/game/${key}`);
      return fetchedGame.data;
    } catch (e) {
      throw new Error(e);
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

  const setGame = (game: Game) => {
    $game.value = game;
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

  return {
    player: computed(() =>
      $game.value?.players?.find((player: Player) => player.name === route?.params?.playerName.toString())
    ),
    players: computed(() =>
      $game?.value?.players?.sort((currentPlayer, nextPlayer) => {
        return currentPlayer.sitIndex - nextPlayer.sitIndex;
      })
    ),
    currentTurn: computed(() => $game?.value?.currentPlayerTurn),
    playedCards: computed(() => $game?.value?.cardsPlayed || []),
    game: computed(() => $game.value),
    setGame,
    startGame,
    disconnectFromGame,
    refreshGame,
    fetchGame,
    loading,
    error,
  };
};

interface UseGameErrors {
  startGame: Error;
  fetchGame: Error;
}
