<template>
  <div
    class="form-scene h-full w-full flex flex-col justify-center items-center"
  >
    <form
      class="
        flex flex-col
        bg-surface-100
        h-1/2
        w-72
        rounded-xl
        border-4 border-green-400
        relative
      "
      :class="{ 'is-flipped': !showFront }"
      @submit.prevent
    >
      <section class="absolute h-full w-full p-6 face" v-if="showFront">
        <slot name="front" v-bind:toggleShowFront="toggleShowFront"></slot>
      </section>
      <section class="absolute h-full w-full p-6 face back" v-if="!showFront">
        <slot name="back" v-bind:toggleShowFront="toggleShowFront"></slot>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FlipCardForm",
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
