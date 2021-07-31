<template>
  <div v-if="game && game.players.length" class="game h-screen max-h-full w-full overflow-hidden relative">
    <h1 class="absolute top-4 left-0 right-0 ml-auto mr-auto text-center text-white text-xl">{{ game.name }}</h1>
    <GameBoard />
    <GameWinnerDialog v-if="winner" :winner="winner" />
  </div>
  <div v-if="isJoiningGame" class="loader h-screen max-h-full w-full flex flex-col items-center justify-center">
    <ProgressSpinner></ProgressSpinner>
    <span class="text-white">Joining game...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from 'vue';

import GameBoard from '@/components/GameBoard.vue';
import GameWinnerDialog from '@/components/Dialogs/GameWinnerDialog.vue';

import { useHubConnection } from '@/composables/useHubConnection';
import { useGame } from '@/composables/useGame';
import { useRoute } from 'vue-router';
import { useGameListeners } from '@/composables/useGameListeners';

export default defineComponent({
  name: 'Game',
  components: { GameBoard, GameWinnerDialog },
  setup() {
    const route = useRoute();

    const {
      player,
      setGame,
      game,
      players,
      winner,
      joinGame,
      loading: isLoadingGame,
      error: joinGameError,
    } = useGame();
    const { connectToHub, isConnected, loading: isLoadingConnection, error } = useHubConnection();
    const { registerGameListeners } = useGameListeners();

    watch(isConnected, async (value) => {
      if (!value) {
        await connectToHub();
      }
    });

    const isJoiningGame = computed(() => {
      return isLoadingGame.value.joinGame || isLoadingConnection.value;
    });

    onMounted(async () => {
      console.log('onMounted');
      if (!game.value?.key?.length) {
        if (!isConnected.value) {
          await connectToHub();
        }
        console.log(localStorage.getItem(`${route.params.gameKey}`));
        const joinedGame = await joinGame({
          gameKey: route.params.gameKey.toString(),
          playerName: localStorage.getItem(`${route.params.gameKey}`),
        });
        console.log({ joinedGame });
        setGame(joinedGame);
      }
      registerGameListeners();
    });

    return {
      game,
      player,
      players,
      winner,
      joinGameError,
      isJoiningGame,
      showWinnerModal: computed(() => {
        return winner.value.key ? true : false;
      }),
    };
  },
});
</script>

<style lang="scss" scoped>
.game {
  perspective: 80em;
  background: radial-gradient(var(--blue-500), var(--surface-300));
}
.loader {
  background: radial-gradient(var(--blue-500), var(--surface-300));
}
</style>
