import { Card, Game } from '@/Types';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { Ref } from 'vue';
import { useHubConnection } from './useHubConnection';

export const useCard = () => {
  const { connection } = useHubConnection();
  const loading: Ref<boolean> = sharedRef('useCard-loading', false);
  const error: Ref<UseCardErrors> = sharedRef('useCard-error', { playCard: null, drawCard: null });

  const playCard = async ({ gameKey, playerName, card }: PlayCardParams) => {
    try {
      loading.value = true;
      const playedCard = await connection.value.invoke('PlayCard', gameKey, playerName, card);
      return playedCard;
    } catch (e) {
      error.value.playCard = e;
    } finally {
      loading.value = false;
    }
  };

  const drawCard = async ({ playerName, game }: DrawCardParams) => {
    try {
      loading.value = true;
      const drawnCard = await connection.value.invoke('DrawRandomCard', playerName, game);
      return drawnCard;
    } catch (e) {
      error.value.drawCard = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    playCard,
    drawCard,
    loading,
    error,
  };
};

interface PlayCardParams {
  gameKey: string;
  playerName: string;
  card: Card;
}

interface DrawCardParams {
  playerName: string;
  game: Game;
}

interface UseCardErrors {
  playCard: Error;
  drawCard: Error;
}
