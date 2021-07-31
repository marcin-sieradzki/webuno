<template>
  <Dialog header="Create game" class="w-1/5" v-model:visible="visible" :closable="true" data-test="Create-Game-Dialog">
    <form class="flex flex-col" @submit.prevent>
      <div class="flex flex-col gap-4">
        <div class="p-field flex flex-col">
          <label for="gameName">Game name</label>
          <InputText
            id="gameName"
            type="text"
            aria-describedby="gameName-help"
            class="p-invalid"
            v-model="gameName"
            :disabled="loading.startGame"
          />
          <small v-if="validationError['gameName']" id="gameName-help" class="p-error">Game name is required.</small>
        </div>
        <div class="p-field flex flex-col">
          <label for="playerName">Username</label>
          <InputText
            id="playerName"
            type="text"
            aria-describedby="playerName-help"
            class="p-invalid"
            v-model="playerName"
            :disabled="loading.startGame"
          />
          <small v-if="validationError['name']" id="playerName-help" class="p-error">Name is required.</small>
        </div>
      </div>
      <Button
        label="Create game"
        class="form-button"
        type="submit"
        :disabled="loading.startGame"
        @click="createGameClicked(gameName, playerName)"
      />
    </form>
  </Dialog>
</template>

<script lang="ts">
import { useGame } from '@/composables/useGame';
import { useHubConnection } from '@/composables/useHubConnection';
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CreateGameDialog',
  setup() {
    const visible = ref(true);
    const playerName = ref('');
    const gameName = ref('');
    const validationError = ref({
      name: false,
      gameName: false,
    });
    const router = useRouter();
    const { startGame, loading } = useGame();
    const { connectToHub } = useHubConnection();

    const createGameClicked = async (gameNameInput: string, playerNameInput: string) => {
      try {
        if (!playerName.value.length) {
          validationError.value['name'] = true;
        }

        if (!gameName.value.length) {
          validationError.value['gameName'] = true;
        }

        if (Object.values(validationError.value).some((_) => _)) {
          return;
        }

        await connectToHub();
        const startedGame = await startGame(playerNameInput, gameNameInput);
        localStorage.setItem(`${startedGame.key}`, playerNameInput);
        navigateToGame(startedGame.key, playerNameInput);
      } catch (e) {}
    };

    const navigateToGame = (gameKey: string, playerName: string) => {
      router.push({
        name: 'Game',
        params: { gameKey, playerName },
      });
    };

    watch(gameName, () => {
      validationError.value['gameName'] = false;
    });

    watch(playerName, () => {
      validationError.value['name'] = false;
    });
    return {
      visible,
      playerName,
      createGameClicked,
      loading,
      gameName,
      validationError,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-button {
  margin-top: 1rem;
}
</style>
