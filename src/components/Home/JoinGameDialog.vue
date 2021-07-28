<template>
  <Dialog header="Join game" class="w-1/5" v-model:visible="visible" :closable="true" data-test="Join-Game-Dialog">
    <div class="flex flex-col" v-if="!isTryingToReconnect && !isGameFull">
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
        label="Join"
        class="form-button"
        type="submit"
        :disabled="isJoiningGame"
        @click="joinGameClicked(gameKey, playerName)"
      />
    </div>
    <div class="flex justify-center items-center" v-if="isTryingToReconnect && !isGameFull">
      <Button
        label="Reconnect"
        class="form-button"
        type="submit"
        :disabled="isJoiningGame"
        @click="joinGameClicked(gameKey)"
        data-test="Dialog-Join-Game-Button"
      />
    </div>
    <div class="flex justify-center items-center" v-if="isGameFull">
      <span>Game is full.</span>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { useGame } from '@/composables/useGame';
import { useHubConnection } from '@/composables/useHubConnection';
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { GameDto } from '@/Types';

export default defineComponent({
  name: 'JoinGameDialog',
  props: {
    gameKey: String,
    gamesList: Array as PropType<GameDto[]>,
  },
  setup(props) {
    const visible = ref(true);
    const playerName = ref('');
    const validationError = ref(false);
    const router = useRouter();
    const { joinGame, loading } = useGame();
    const { connectToHub, loading: isConnectingToHub } = useHubConnection();

    const isTryingToReconnect = computed(() => {
      return localStorage.getItem(`${props.gameKey}`)?.length ? true : false;
    });

    const isGameFull = computed(() => {
      if (isTryingToReconnect.value) {
        return false;
      }
      const games = props.gamesList?.map((g) => ({ ...g }));
      const game = games?.find((game) => game.key === props.gameKey);
      return game.playerCount === 4;
    });

    const isJoiningGame = computed(() => {
      return loading.joinGame?.value || isConnectingToHub.value;
    });

    const joinGameClicked = async (gameKey: string, playerName?: string) => {
      try {
        if (isTryingToReconnect.value) {
          await connectToHub();
          const nameFromGame = localStorage.getItem(`${props.gameKey}`);
          await joinGame({ gameKey, playerName: nameFromGame });
          navigateToGame(gameKey);
          return;
        }

        if (!playerName?.length) {
          validationError.value = true;
          return;
        }

        await connectToHub();
        const joinedGame = await joinGame({ gameKey, playerName });
        localStorage.setItem(`${joinedGame.key}`, playerName);
        navigateToGame(gameKey);
      } catch (e) {}
    };

    const navigateToGame = (gameKey: string) => {
      router.push({
        name: 'Game',
        params: { gameKey },
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
      isTryingToReconnect,
      isGameFull,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-button {
  margin-top: 1rem;
}
</style>
