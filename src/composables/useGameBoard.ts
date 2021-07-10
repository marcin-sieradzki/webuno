import { useGame } from '@/composables/useGameService';
import { computed } from 'vue';
import { useCardService } from './useCardService';

export function getIsPlayerTurn(currentTurnPlayerName: string, username: string) {
  return currentTurnPlayerName === username;
}

export const useGameBoard = () => {
  const { player, currentTurn } = useGame();
  const { loading: isUsingCard } = useCardService();

  const isPlayerTurn = computed(() => getIsPlayerTurn(currentTurn.value, player.value.name));
  const disableCardActions = computed(() => !isPlayerTurn.value || isUsingCard.value);

  return {
    isPlayerTurn,
    disableCardActions,
  };
};
