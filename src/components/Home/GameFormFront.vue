<template>
  <div class="h-full w-full flex flex-col items-center justify-center relative">
    <h2 class="text-white text-xl text-center absolute top-16">New Game</h2>
    <div class="flex flex-col">
      <span class="p-float-label w-full">
        <InputText
          class="w-full"
          type="text"
          id="playerName"
          :value="modelValue"
          :disabled="loading"
          @update:modelValue="$emit('update:modelValue', $event)"
        />
        <label for="playerName">Name</label>
      </span>

      <Button
        label="Create new game"
        class="form-button"
        type="submit"
        :disabled="loading"
        @click="$emit('startGame')"
      />
      <Button class="form-button p-button-link" :disabled="loading" @click="$emit('toggleShowFront')"
        >Click here to join existing game.</Button
      >
    </div>
  </div>
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

<style lang="scss" scoped>
.form-button {
  margin-top: 1.5rem;
}
</style>
