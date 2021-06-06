<template>
  <h2 class="text-white text-xl text-center">Join Game</h2>
  <div class="h-full w-full flex flex-col justify-center">
    <label for="gameKey" class="text-text-color">Game Key</label>
    <InputText
      type="text"
      id="gameKey"
      :value="gameKey"
      @update:modelValue="$emit('update:gameKey', $event)"
      class="w-full"
    />
    <label for="name" class="text-text-color">Name</label>
    <InputText
      type="text"
      id="name"
      :value="playerName"
      @update:modelValue="$emit('update:playerName', $event)"
      class="w-full"
    />
    <Button
      label="Join game"
      class="w-full"
      type="submit"
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
  props: {
    playerName: String,
    gameKey: String,
  },
  emits: ["joinGame", "toggleShowFront", "update:playerName", "update:gameKey"],
});
</script>

<style></style>
