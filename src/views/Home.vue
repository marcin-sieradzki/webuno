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

    const startGame = async () => {
      if (!useGameConnection.connection.value) {
        await useGameConnection.connect();
      }
      const gameUUID = uuidv4();
      await useGameConnection.startGame(gameUUID);
      console.log(gameUUID);
      await joinGame(useGameConnection.getGameKey().value, playerName.value);
      router.push("/game");
    };

    const joinGame = async (gameKey: string, nick: string) => {
      if (!useGameConnection.connection.value) {
        await useGameConnection.connect();
      }
      await useGameConnection.joinGame(gameKey, nick);
      router.push("/game");
    };

    const uuidv4 = () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
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
