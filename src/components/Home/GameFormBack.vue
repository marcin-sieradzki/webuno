<template>
  <div class="h-full w-full flex flex-col items-center justify-center relative">
    <h2 class="text-white text-xl text-center absolute top-6">Join Game</h2>
    <div class="flex flex-col">
      <span class="p-float-label w-full">
        <InputText
          type="text"
          id="gameKey"
          :value="gameKey"
          @update:modelValue="$emit('update:gameKey', $event)"
          class="w-full"
          :disabled="loading"
        />
        <label for="gameKey">Game key</label>
      </span>
      <span class="p-float-label w-full form-button">
        <InputText
          type="text"
          id="name"
          :value="playerName"
          @update:modelValue="$emit('update:playerName', $event)"
          class="w-full"
          :disabled="loading"
        />
        <label for="name">Name</label>
      </span>
      <Button
        label="Join game"
        class="w-full form-button"
        type="submit"
        :disabled="loading"
        @click="$emit('joinGame', { gameKey, playerName })"
      />
      <Button @click="$emit('toggleShowFront')" class="p-button-link form-button w-full"
        >Click here to create a new game.</Button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GameFormBack',
  props: {
    playerName: String,
    gameKey: String,
    loading: Boolean,
  },
  emits: ['joinGame', 'toggleShowFront', 'update:playerName', 'update:gameKey'],
});
</script>

<style lang="scss" scoped>
.form-button {
  margin-top: 1.5rem;
}
</style>
