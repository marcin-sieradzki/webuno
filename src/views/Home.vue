<template>
  <section
    class="
      h-screen
      w-screen
      flex flex-col
      justify-center
      items-center
      bg-surface-b
    "
  >
    <h1 class="text-text-color text-4xl font-semibold">Webuno</h1>
    <FlipCardForm>
      <template #front="{ toggleShowFront }">
        <GameFormFront
          v-model="playerName"
          @toggleShowFront="toggleShowFront"
          @startGame="startGame"
        ></GameFormFront>
      </template>
      <template #back="{ toggleShowFront }">
        <GameFormBack
          v-model:playerName="playerName"
          v-model:gameKey="gameKey"
          @toggleShowFront="toggleShowFront"
          @joinGame="joinGame(gameKey, playerName)"
        ></GameFormBack>
      </template>
    </FlipCardForm>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import { useGame } from "@/composables/useGame";
import { useRouter } from "vue-router";
import FlipCardForm from "@/components/Forms/FlipCardForm.vue";
import GameFormFront from "@/components/Home/GameFormFront.vue";
import GameFormBack from "@/components/Home/GameFormBack.vue";

export default defineComponent({
  name: "Home",
  components: {
    FlipCardForm,
    GameFormFront,
    GameFormBack,
  },
  setup() {
    const gameKey = ref("");
    const playerName = ref("");

    const router = useRouter();
    const { startGame: useStartGame, game, joinGame: useJoinGame } = useGame();

    const startGame = async () => {
      await useStartGame(playerName.value);
      navigateToGame(game.value.key, playerName.value);
    };

    const joinGame = async (gameKey: string, playerName: string) => {
      await useJoinGame(gameKey, playerName);
      navigateToGame(gameKey, playerName);
    };

    const navigateToGame = (gameKey: string, playerName: string) => {
      router.push({
        name: "Game",
        params: { gameKey, playerName },
      });
    };

    const rules = {
      gameKey: { required },
      playerName: { required, minLength: minLength(3) },
    };

    const v$ = useVuelidate(rules, { gameKey, playerName });

    return {
      gameKey,
      playerName,
      startGame,
      joinGame,
      v$,
    };
  },
});
</script>

<style lang="scss"></style>
