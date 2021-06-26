<template>
  <div class="break-all">
    <span class="text-blue-200">{{ playerName }}: </span><span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatMessage',
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
