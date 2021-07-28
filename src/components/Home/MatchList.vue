<template>
  <main
    class="
      h-[66vh]
      w-[50vw]
      min-h-2/3 min-w-1/2
      border border-gray-600
      bg-surface-0
      rounded-2xl
      p-4
      grid grid-cols-1 grid-rows-[auto,1fr,auto]
    "
  >
    <div class="flex justify-between items-center pb-4">
      <h2 class="text-white">Choose a match from a list below to join.</h2>
      <Button :disabled="loading" @click="toggleCreateGameDialog" data-test="Create-Game-Button"
        >Create a new game</Button
      >
    </div>
    <ul
      v-if="allGames.length"
      class="h-full w-full backdrop-filter border border-gray-600 overflow-auto rounded-2xl text-gray-300"
    >
      <li
        v-for="game in allGames"
        :key="game.key"
        class="w-full p-4 cursor-pointer flex justify-between hover:bg-surface-900"
        :class="{
          'text-white': selectedGame?.key == game.key,
          'bg-surface-700': selectedGame?.key == game.key,
          'bg-surface-400 odd:bg-surface-300': selectedGame?.key != game.key,
        }"
        @click="selectGame(game)"
      >
        <span>{{ game.name }}</span>
        <span>{{ game.playerCount }}/4</span>
      </li>
    </ul>
    <div class="text-gray-300">
      <div v-if="loading" class="w-full h-full flex flex-col justify-center items-center">
        <ProgressSpinner></ProgressSpinner>
        <p class="text-sm">loading matches... this may take a minute 🤷‍♀️</p>
      </div>
      <div class="h-full flex flex-col justify-center items-center" v-if="error">
        <p class="mb-4">Error occured while loading matches. 😒</p>
        <Button :disabled="loading" @click="fetchAllGames">Try again</Button>
      </div>
    </div>

    <Button
      :disabled="loading || !selectedGame"
      @click="toggleJoinGameDialog"
      class="join-game-button place-self-end"
      data-test="Join-Game-Button"
      >Join</Button
    >
  </main>
  <JoinGameDialog
    v-if="isJoinGameDialogOpen"
    :gameKey="selectedGame.key"
    :gamesList="allGames"
    @update:visible="toggleJoinGameDialog"
  />
  <CreateGameDialog v-if="isCreateGameDialogOpen" @update:visible="toggleCreateGameDialog" />
</template>

<script lang="ts">
import JoinGameDialog from './JoinGameDialog.vue';
import CreateGameDialog from './CreateGameDialog.vue';
import { defineComponent, onMounted } from 'vue';
import { useAllGames } from '@/composables/useAllGames';
import { useMatchList } from '@/composables/useMatchList';

export default defineComponent({
  name: 'MatchList',
  components: {
    JoinGameDialog,
    CreateGameDialog,
  },
  setup() {
    const { fetchAllGames, allGames, loading, error } = useAllGames();
    const {
      toggleJoinGameDialog,
      openCreateGameDialog,
      isJoinGameDialogOpen,
      isCreateGameDialogOpen,
      toggleCreateGameDialog,
      selectGame,
      selectedGame,
    } = useMatchList();

    onMounted(async () => {
      await fetchAllGames();
    });
    return {
      allGames,
      fetchAllGames,
      toggleJoinGameDialog,
      openCreateGameDialog,
      isJoinGameDialogOpen,
      isCreateGameDialogOpen,
      toggleCreateGameDialog,
      selectGame,
      selectedGame,
      loading,
      error,
    };
  },
});
</script>
<style lang="scss" scoped>
.join-game-button {
  margin-top: 1rem;
}
</style>
