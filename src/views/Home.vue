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
import useGameConnection from "@/composables/useGameConnection";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  setup() {
    const gameKey = ref("");
    const playerName = ref("");
    const router = useRouter();
    const test = useGameConnection;
    const startGame = async () => {
      await useGameConnection.startGame(playerName.value);
      await joinGame(useGameConnection.getGameKey().value, playerName.value);
      router.push({
        name: "Game",
        params: {
          gameKey: useGameConnection.getGameKey().value,
          playerName: playerName.value,
        },
      });
    };

    const joinGame = async (gameKey: string, nick: string) => {
      await useGameConnection.joinGame(gameKey, nick);
      router.push({
        name: "Game",
        params: { gameKey: gameKey, playerName: playerName.value },
      });
    };
    return {
      gameKey,
      playerName,
      startGame,
      joinGame,
      test,
    };
  },
});
</script>

<style></style>
