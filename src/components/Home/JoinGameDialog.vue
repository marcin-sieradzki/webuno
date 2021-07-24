<template>
  <Dialog header="Join game" class="w-1/5" v-model:visible="visible" :closable="true">
    <div class="flex flex-col">
      <div class="p-field flex flex-col">
        <label for="playerName">Name</label>
        <InputText
          id="playerName"
          type="text"
          aria-describedby="playerName-help"
          class="p-invalid"
          v-model="playerName"
          :disabled="isJoiningGame"
        />
        <small v-if="validationError" id="playerName-help" class="p-error">Name is required.</small>
      </div>

      <Button
        label="Join game"
        class="form-button"
        type="submit"
        :disabled="isJoiningGame"
        @click="joinGameClicked(gameKey, playerName)"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { useJoinGame } from '@/composables/useJoinGame';
import { useHubConnection } from '@/composables/useHubConnection';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'JoinGameDialog',
  props: {
    gameKey: String,
  },
  setup() {
    const visible = ref(true);
    const playerName = ref('');
    const validationError = ref(false);
    const router = useRouter();
    const { joinGame, loading } = useJoinGame();
    const { connectToHub, loading: isConnectingToHub } = useHubConnection();

    const isJoiningGame = computed(() => {
      return loading.value || isConnectingToHub.value;
    });
    const joinGameClicked = async (gameKey: string, playerName: string) => {
      try {
        if (!playerName.length) {
          validationError.value = true;
          return;
        }

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

    watch(playerName, () => {
      validationError.value = false;
    });

    return {
      visible,
      playerName,
      joinGameClicked,
      validationError,
      isJoiningGame,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-button {
  margin-top: 1rem;
}
</style>
