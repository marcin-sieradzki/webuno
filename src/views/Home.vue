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
        <JoinGameFrontFace
          @toggleShowFront="toggleShowFront"
          @startGame="startGame"
          @playerNameUpdated="playerName = $event"
        ></JoinGameFrontFace>
      </template>
      <template #back="{ toggleShowFront }">
        <GameFormBack
          @toggleShowFront="toggleShowFront"
          @joinGame="joinGame(gameKey, playerName)"
          @playerNameUpdated="playerName = $event"
          @gameKeyUpdated="gameKey = $event"
        ></GameFormBack>
      </template>
    </FlipCardForm>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGame } from "@/composables/useGame";
import { useRouter } from "vue-router";
import FlipCardForm from "@/components/Forms/FlipCardForm.vue";
import JoinGameFrontFace from "@/components/Home/JoinGameFrontFace.vue";
import GameFormBack from "@/components/Home/GameFormBack.vue";

export default defineComponent({
  name: "Home",
  components: {
    FlipCardForm,
    JoinGameFrontFace,
    GameFormBack,
  },
  setup() {
    const gameKey = ref("");
    const playerName = ref("");

    const router = useRouter();
    const { startGame: useStartGame, game, joinGame: useJoinGame } = useGame();

    const startGame = async () => {
      await useStartGame(playerName.value);
      router.push({
        name: "Game",
        params: {
          gameKey: game.value.key,
          playerName: playerName.value,
        },
      });
    };

    const joinGame = async (gameKey: string, playerName: string) => {
      await useJoinGame(gameKey, playerName);
      router.push({
        name: "Game",
        params: { gameKey: gameKey, playerName: playerName },
      });
    };
    return {
      gameKey,
      playerName,
      startGame,
      joinGame,
    };
  },
});
</script>

<style lang="scss"></style>
