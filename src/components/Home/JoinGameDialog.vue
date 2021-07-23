<template>
  <Dialog header="Join game" class="w-1/5" v-model:visible="visible" :closable="true">
    <div class="flex flex-col">
      <span class="p-float-label w-full">
        <InputText class="w-full" type="text" id="playerName" v-model="playerName" :disabled="loading" />
        <label for="playerName">Name</label>
      </span>
      <Button
        label="Join game"
        class="form-button"
        type="submit"
        :disabled="loading"
        @click="joinGameClicked(gameKey, playerName)"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { useJoinGame } from '@/composables/useJoinGame';
import { useHubConnection } from '@/composables/useHubConnection';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'JoinGameDialog',
  props: {
    gameKey: String,
  },
  setup() {
    const visible = ref(true);
    const playerName = ref('');
    const router = useRouter();
    const { joinGame, loading } = useJoinGame();
    const { connectToHub } = useHubConnection();

    const joinGameClicked = async (gameKey: string, playerName: string) => {
      try {
        await connectToHub();
        await joinGame({ gameKey, playerName });
        navigateToGame(gameKey, playerName);
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
      joinGameClicked,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-button {
  margin-top: 1rem;
}
</style>
