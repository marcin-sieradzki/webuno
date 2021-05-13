<template>
  <div class="h-12 mb-3 flex items-center">
    <div
      class="rounded-full h-10 w-10 bg-blue-600 flex justify-center items-center text-text-color font-bold"
    >
      {{ nameFirstLetter }}
    </div>
    <div
      class="message relative rounded h-10 flex items-center ml-4 w-full bg-teal-200 px-2"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ChatMessage",
  props: {
    playerName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const nameFirstLetter = computed(() => props.playerName.charAt(0));

    return {
      nameFirstLetter,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  &::before {
    content: "";
    position: absolute;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--teal-200);
  }
}
</style>
