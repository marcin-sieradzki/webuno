import { useGame } from '@/composables/useGame';
import { computed } from 'vue';
import { useCard } from './useCard';

export const useGameBoard = () => {
  const { player, currentTurn } = useGame();
  const { loading: isUsingCard } = useCard();

  const isPlayerTurn = computed(() => {
    return currentTurn.value === player?.value?.name;
  });

  const disableCardActions = computed(() => {
    return !isPlayerTurn.value || isUsingCard.value;
  });

  return {
    isPlayerTurn,
    disableCardActions,
  };
};
