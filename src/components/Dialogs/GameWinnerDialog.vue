<template>
  <Dialog header="Game over" v-model:visible="visible" :closable="false">
    <div class="p-3 pl-0">
      <p class="pb-2">The winner is: {{ winner.name }}</p>
      <router-link :to="{ name: 'Home' }"
        ><span class="text-blue-400 hover:underline hover:text-blue-600"
          >Back to main page</span
        ></router-link
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
