<template>
  <section class="home h-screen w-screen flex flex-col justify-center items-center">
    <div>
      <h1 class="text-white text-4xl font-semibold text-center">Webuno</h1>
      <FlipCardForm>
        <template #front="{ toggleShowFront }">
          <GameFormFront
            v-model="playerName"
            @toggleShowFront="toggleShowFront"
            @startGame="onStartGame"
            :loading="isStartingGame"
          ></GameFormFront>
        </template>
        <template #back="{ toggleShowFront }">
          <GameFormBack
            v-model:playerName="playerName"
            v-model:gameKey="gameKey"
            @toggleShowFront="toggleShowFront"
            @joinGame="onJoinGame(gameKey, playerName)"
            :loading="isJoiningGame"
          ></GameFormBack>
        </template>
      </FlipCardForm>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useGame } from '@/composables/useGame';
import { useJoinGame } from '@/composables/useJoinGame';
import { useRouter } from 'vue-router';
import { useHubConnection } from '@/composables/useHubConnection';

import FlipCardForm from '@/components/Forms/FlipCardForm.vue';
import GameFormFront from '@/components/Home/GameFormFront.vue';
import GameFormBack from '@/components/Home/GameFormBack.vue';

export default defineComponent({
  name: 'Home',
  components: {
    FlipCardForm,
    GameFormFront,
    GameFormBack,
  },
  setup() {
    const gameKey = ref('');
    const playerName = ref('');

    const router = useRouter();
    const { startGame, game, setGame, error, loading: isStartingGame } = useGame();
    const { joinGame, loading: isJoiningGame, error: joinGameError } = useJoinGame();
    const { connectToHub, isConnected } = useHubConnection();

    const onStartGame = async () => {
      if (!isConnected.value) {
        await connectToHub();
      }

      const startedGame = await startGame(playerName.value);
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
      playerName,
      onStartGame,
      onJoinGame,
      isJoiningGame,
      joinGameError,
      isStartingGame,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  background: radial-gradient(var(--blue-500), var(--surface-100));
}
</style>
