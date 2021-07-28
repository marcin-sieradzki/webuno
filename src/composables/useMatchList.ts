import { Game } from 'src/Types';
import { ref, Ref } from 'vue';

export const useMatchList = () => {
  const selectedGame: Ref<Game | null> = ref(null);
  const selectGame = (game: Game) => {
    selectedGame.value = game;
  };

  const isJoinGameDialogOpen = ref(false);
  const toggleJoinGameDialog = () => {
    isJoinGameDialogOpen.value = !isJoinGameDialogOpen.value;
  };

  const isCreateGameDialogOpen = ref(false);
  const toggleCreateGameDialog = () => {
    isCreateGameDialogOpen.value = !isCreateGameDialogOpen.value;
  };

  return {
    selectedGame,
    selectGame,
    isJoinGameDialogOpen,
    isCreateGameDialogOpen,
    toggleJoinGameDialog,
    toggleCreateGameDialog,
  };
};
