<template>
  <h2 class="text-white text-xl text-center">New Game</h2>
  <div class="h-full w-full flex flex-col justify-center">
    <label for="playerName" class="text-text-color">Name</label>
    <InputText
      type="text"
      id="playerName"
      :value="modelValue"
      :disabled="loading"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <Button
      label="Create new game"
      class="mt-2"
      type="submit"
      :disabled="loading"
      @click="$emit('startGame')"
    />
  </div>
  <Button
    :disabled="loading"
    @click="$emit('toggleShowFront')"
    class="bottom-16 p-button-text"
    >Join game</Button
  >
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'GameFormFront',
    emits: ['toggleShowFront', 'update:modelValue', 'startGame'],
    props: {
      modelValue: {
        type: String,
      },
      loading: Boolean,
    },
  });
</script>
