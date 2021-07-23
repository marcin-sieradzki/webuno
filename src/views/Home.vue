<template>
  <section class="home h-screen w-screen flex flex-col justify-center items-center bg-">
    <h1 class="text-white text-4xl font-semibold text-center">Webuno</h1>
    <MatchList />
  </section>
</template>

<script lang="ts">
import MatchList from '../components/Home/MatchList.vue';
import { computed, defineComponent, ref } from 'vue';

import { useGameService } from '@/composables/useGameService';
import { useRouter } from 'vue-router';
import { useHubConnection } from '@/composables/useHubConnection';

export default defineComponent({
  name: 'Home',
  components: {
    MatchList,
  },
  setup() {
    const gameKey = ref('');
    const playerName = ref('');
    const gameName = ref('');

    const router = useRouter();
    const { startGame, game, setGame, error, loading: isLoadingGame, joinGame } = useGameService();
    const { connectToHub, isConnected, loading: isConnectingToHub, error: hubConnectError } = useHubConnection();

    const isFormLoading = computed(() => isLoadingGame || isConnectingToHub);

    const onStartGame = async () => {
      if (!isConnected.value) {
        await connectToHub();
      }

      const startedGame = await startGame(playerName.value, gameName.value);
      setGame(startedGame);
      navigateToGame(game.value.key, playerName.value);
    };

    const onJoinGame = async (gameKey: string, playerName: string) => {
      if (!isConnected.value) {
        await connectToHub();
      }

      const joinedGame = await joinGame({ gameKey, playerName });
      setGame(joinedGame);
      navigateToGame(gameKey, playerName);
    };

    const navigateToGame = (gameKey: string, playerName: string) => {
      router.push({
        name: 'Game',
        params: { gameKey, playerName },
      });
    };

    return {
      gameKey,
      error,
      hubConnectError,
      playerName,
      onStartGame,
      onJoinGame,
      isLoading: isFormLoading.value,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  background: linear-gradient(var(--green-500), var(--green-300));
}
</style>
