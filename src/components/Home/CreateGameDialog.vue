<template>
  <Dialog header="Create game" class="w-1/5" v-model:visible="visible" :closable="true">
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <span class="p-float-label w-full">
          <InputText class="w-full" type="text" id="gameName" v-model="gameName" :disabled="loading" />
          <label for="gameName">Game name</label>
        </span>
        <span class="p-float-label w-full">
          <InputText class="w-full" type="text" id="playerName" v-model="playerName" :disabled="loading" />
          <label for="playerName">Player Name</label>
        </span>
      </div>
      <Button
        label="Create game"
        class="form-button"
        type="submit"
        :disabled="loading"
        @click="createGameClicked(gameName, playerName)"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { useGameService } from '@/composables/useGameService';
import { useHubConnection } from '@/composables/useHubConnection';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CreateGameDialog',
  setup() {
    const visible = ref(true);
    const playerName = ref('');
    const gameName = ref('');
    const router = useRouter();
    const { startGame, loading } = useGameService();
    const { connectToHub } = useHubConnection();

    const createGameClicked = async (gameName: string, playerName: string) => {
      try {
        await connectToHub();
        const startedGame = await startGame(playerName, gameName);
        navigateToGame(startedGame.key, playerName);
      } catch (e) {}
    };
    const navigateToGame = (gameKey: string, playerName: string) => {
      router.push({
        name: 'Game',
        params: { gameKey, playerName },
      });
    };
    return {
      visible,
      playerName,
      createGameClicked,
      loading,
      gameName,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-button {
  margin-top: 1rem;
}
</style>
