import { useGame } from '@/composables/useGame';
import { computed } from 'vue';
import { useFetcher } from '@/composables/useFetcher';

export const useTable = () => {
  const { player, currentTurn, drawCardFetcher, playCardFetcher } = useGame();
  const {
    loading: isDrawingCard,
    error: drawCardError,
    getData: drawCard,
  } = useFetcher(drawCardFetcher);

  const {
    loading: isPlayingCard,
    error: playCardError,
    getData: playCard,
  } = useFetcher(playCardFetcher);
  console.log(player.value);
  const isPlayerTurn = computed(() => {
    return currentTurn.value === player?.value?.name;
  });

  const disableCardActions = computed(() => {
    return !isPlayerTurn.value || isDrawingCard.value || isPlayingCard.value;
  });

  return {
    isPlayerTurn,
    disableCardActions,
    drawCard,
    playCard,
    drawCardError,
    playCardError,
  };
};
