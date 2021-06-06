<template>
  <section
    class="
      game-table
      h-screen
      w-full
      grid grid-cols-3 grid-rows-3
      rounded-lg
      shadow-2xl
    "
  >
    <MiddleTable></MiddleTable>
    <PlayerSeats></PlayerSeats>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Card from '@/components/Card.vue';
  import CardStack from '@/components/Table/CardStack.vue';
  import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';
  import MiddleTable from '@/components/Table/MiddleTable.vue';
  import PlayerSeats from '@/components/Table/PlayerSeats.vue';

  export default defineComponent({
    name: 'Table',
    components: { Card, CardStack, PlayerAvatar, MiddleTable, PlayerSeats },
  });
</script>

<style lang="scss" scoped>
  .game-table {
    transform: translateY(-5vh) rotateX(30deg);
    transform-style: preserve-3d;
    background: radial-gradient(var(--blue-500), var(--surface-100));
  }
</style>
