<template>
  <Dialog v-model:visible="visible" :closable="false">
    <template #header>
      <div class="w-full">
        <h2 class="text-center text-xl">Game Over</h2>
      </div>
    </template>
    <div class="p-3 pl-0 w-80 flex flex-col justify-center items-center">
      <p class="pb-2">
        The winner is: <span class="text-green-500 font-bold text-xl">{{ winner.name }}</span>
      </p>
      <router-link :to="{ name: 'Home' }"
        ><span class="text-blue-400 hover:underline hover:text-blue-600">Back to main page</span></router-link
      >
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Player } from '@/Types';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'GameWinnerDialog',
  props: {
    winner: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
  setup() {
    const visible = ref(true);
    return {
      visible,
    };
  },
});
</script>
