<template>
  <main
    class="h-screen w-screen flex flex-col justify-center items-center bg-surface-b"
  >
    <h1 class="text-text-color mb-16 text-4xl font-semibold">Webuno</h1>
    <section
      class="flex flex-col items-center justify-between max-w-sm max-h-72 p-6 bg-surface-a h-2/6"
    >
      <label for="playerName" class="text-text-color">Player Name</label>
      <InputText
        type="text"
        id="playerName"
        v-model="playerName"
        class="w-full"
      />
      <label for="gameKey" class="text-text-color">Game Key</label>
      <InputText type="text" id="gameKey" v-model="gameKey" class="w-full" />
      <Button label="New game" class="w-full" @click="startGame" />
      <Button
        label="Join game"
        class="w-full"
        @click="joinGame(gameKey, playerName)"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGame } from "@/composables/useGame";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
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

<style></style>
