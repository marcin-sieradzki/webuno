<template>
  <h2 class="text-white text-xl text-center">Join Game</h2>
  <div class="h-full w-full flex flex-col justify-center">
    <label for="gameKey" class="text-text-color">Game Key</label>
    <InputText type="text" id="gameKey" v-model="gameKey" class="w-full" />
    <label for="name" class="text-text-color">Name</label>
    <InputText type="text" id="name" v-model="playerName" class="w-full" />
    <Button
      label="Join game"
      class="w-full"
      @click="$emit('joinGame', { gameKey, playerName })"
    />
  </div>
  <Button @click="$emit('toggleShowFront')" class="bottom-16 p-button-text"
    >New game</Button
  >
</template>

<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "GameFormBack",
  emits: ["joinGame", "toggleShowFront", "playerNameUpdated", "gameKeyUpdated"],
  setup(props, { emit }) {
    const playerName = ref("");
    const gameKey = ref("");
    watch(playerName, () => emit("playerNameUpdated", playerName.value));
    watch(gameKey, () => emit("gameKeyUpdated", gameKey.value));
    return {
      playerName,
      gameKey,
    };
  },
});
</script>

<style></style>
