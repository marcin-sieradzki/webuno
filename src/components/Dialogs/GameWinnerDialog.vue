<template>
  <Dialog
    header="Game over"
    v-model:visible="showWinnerModal"
    :closable="false"
  >
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
  import { defineComponent, computed } from 'vue';
  import { useGame } from '@/composables/useGame';

  export default defineComponent({
    name: 'GameWinnerDialog',

    setup() {
      const { game } = useGame();

      const winner = computed(() => {
        const winnerId = game?.value?.winnerId;
        return winnerId
          ? game.value.players.find((player) => player.key == winnerId)
          : null;
      });

      return {
        winner,
        showWinnerModal: computed(() => {
          winner?.value?.key.length ? true : false;
        }),
      };
    },
  });
</script>
