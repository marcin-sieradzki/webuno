<template>
  <div class="form-scene h-full w-full flex flex-col justify-center items-center">
    <form
      class="flex flex-col h-120 w-80 rounded-xl border-4 border-white bg-green-400 relative shadow-md"
      :class="{ 'is-flipped': !showFront }"
      @submit.prevent
    >
      <div class="w-full h-full border-4 rounded-[50%] transform rotate-12 absolute pointer-events-none"></div>
      <div class="absolute h-full w-full p-6 face" v-if="showFront">
        <slot name="front" v-bind:toggleShowFront="toggleShowFront"></slot>
      </div>
      <div class="absolute h-full w-full p-6 face back" v-if="!showFront">
        <slot name="back" v-bind:toggleShowFront="toggleShowFront"></slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'FlipCardForm',
  setup() {
    const showFront = ref(true);
    const toggleShowFront = () => {
      showFront.value = !showFront.value;
    };

    return {
      showFront,
      toggleShowFront,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-scene {
  perspective: 700px;
}
form {
  transition: transform 1s !important;
  transform-style: preserve-3d !important;
}
.face {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.back {
  transform: rotateY(180deg) !important;
}
.is-flipped {
  transform: rotateY(180deg);
}
</style>
