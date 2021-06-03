<template>
  <h2 class="text-white text-xl text-center">New Game</h2>
  <div class="h-full w-full flex flex-col justify-center">
    <label for="playerName" class="text-text-color">Name</label>
    <InputText type="text" id="playerName" v-model="playerName" class="" />
    <Button label="Create new game" class="mt-2" @click="$emit('startGame')" />
  </div>
  <Button @click="$emit('toggleShowFront')" class="bottom-16 p-button-text"
    >Join game</Button
  >
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "JoinGameFrontFace",
  emits: ["toggleShowFront", "playerNameUpdated", "startGame"],
  setup(props, { emit }) {
    const playerName = ref("");
    watch(playerName, () => emit("playerNameUpdated", playerName.value));
    return {
      playerName,
    };
  },
});
</script>
