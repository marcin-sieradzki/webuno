import { useGame } from '@/composables/useGame';
import { computed } from 'vue';
import { useFetcher } from '@/composables/useFetcher';

export const useTable = () => {
  const { player, currentTurn, isDrawingCard, isPlayingCard } = useGame();

  const isPlayerTurn = computed(() => {
    return currentTurn.value === player?.value?.name;
  });

  const disableCardActions = computed(() => {
    return !isPlayerTurn.value || isDrawingCard.value || isPlayingCard.value;
  });

  return {
    isPlayerTurn,
    disableCardActions,
    isDrawingCard,
  };
};
