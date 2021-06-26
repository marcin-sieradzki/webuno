import { Game, Player } from '@/Types';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const $game = ref<Game | null>(null);

export const useGameValues = () => {
  const route = useRoute();
  const setGame = (game: Game) => {
    $game.value = game;
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
    game: computed(() => $game.value),
    currentTurn: computed(() => $game?.value?.currentPlayerTurn),
    playedCards: computed(() => $game?.value?.cardsPlayed || []),
    setGame,
  };
};
