import { Game } from './../Types';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { Ref } from 'vue';
import { useHubConnection } from './useHubConnection';

const { connection } = useHubConnection();

export const useJoinGame = () => {
  const loading: Ref<boolean> = sharedRef<boolean>('useJoinGame-loading', false);
  const error: Ref<Error> = sharedRef('useWishlist-error', null);

  async function joinGame({ gameKey, playerName }: JoinGameParams): Promise<Game> {
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
  }
  return {
    joinGame,
    loading,
    error,
  };
};

interface JoinGameParams {
  gameKey: string;
  playerName: string;
}
