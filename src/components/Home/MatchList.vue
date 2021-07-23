<template>
  <main
    class="h-1/2 w-1/2 border border-gray-600 bg-surface-0 rounded-2xl p-4 grid grid-cols-1 grid-rows-[auto,1fr,auto]"
  >
    <div class="flex justify-between items-center pb-4">
      <h2 class="text-white">Choose a match from a list below to join.</h2>
      <Button :disabled="loading || !selectedGame" @click="toggleJoinGameDialog">Join</Button>
    </div>
    <ul class="h-full w-full backdrop-filter border border-gray-600 overflow-auto rounded-2xl text-white">
      <template v-if="allGames.length">
        <li
          v-for="game in allGames"
          :key="game.key"
          class="w-full p-4 cursor-pointer flex justify-between"
          :class="{
            'bg-surface-700': selectedGame?.key == game.key,
            'bg-surface-400 odd:bg-surface-300': selectedGame?.key != game.key,
          }"
          @click="selectGame(game)"
        >
          <span>{{ game.name }}</span>
          <span>{{ game.playerCount }}/4</span>
        </li>
      </template>
      <div v-if="loading" class="w-full h-full flex justify-center items-center">
        <ProgressSpinner></ProgressSpinner>
      </div>
    </ul>
    <Button class="create-game-button w-44 place-self-end" :disabled="loading" @click="toggleCreateGameDialog"
      >Create a new game</Button
    >
  </main>
  <JoinGameDialog v-if="isJoinGameDialogOpen" :gameKey="selectedGame.key" @update:visible="toggleJoinGameDialog" />
  <CreateGameDialog v-if="isCreateGameDialogOpen" @update:visible="toggleCreateGameDialog" />
</template>

<script lang="ts">
import JoinGameDialog from './JoinGameDialog.vue';
import CreateGameDialog from './CreateGameDialog.vue';
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useAllGames } from '@/composables/useAllGames';
import { Game } from '@/Types';
export default defineComponent({
  name: 'MatchList',
  components: {
    JoinGameDialog,
    CreateGameDialog,
  },
  setup() {
    const { fetchAllGames, allGames, loading, error } = useAllGames();

    const selectedGame: Ref<Game> = ref(null);
    const selectGame = (game: Game) => {
      if (selectedGame?.value?.key == game.key) {
        selectedGame.value = null;
        return;
      }
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

    const openCreateGameDialog = () => {};
    onMounted(async () => {
      await fetchAllGames();
    });
    return {
      allGames,
      toggleJoinGameDialog,
      openCreateGameDialog,
      isJoinGameDialogOpen,
      isCreateGameDialogOpen,
      toggleCreateGameDialog,
      selectGame,
      selectedGame,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
.create-game-button {
  margin-top: 1rem;
}
.active {
  @apply bg-green-500;
}
</style>
