<template>
  <main
    class="h-screen w-screen flex flex-col justify-center items-center bg-surface-b"
  >
    <h1 class="text-text-color mb-16 text-4xl font-semibold">Webuno</h1>
    <section
      class="flex flex-col items-center justify-between max-w-lg max-h-72 p-6 bg-surface-a h-2/6"
    >
      <Button label="New game" class="w-full" />
      <div>
        <div class="mb-4">
          <label for="gameId" class="text-text-color">Game ID</label>
          <InputText type="text" id="gameId" v-model="gameId" class="w-full" />
        </div>
        <Button label="Join a game" class="w-full" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const gameId = ref("");

    return {
      gameId,
    };
  },
});
</script>

<style></style>
