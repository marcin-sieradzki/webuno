<template>
  <div
    v-if="game && game.cardsPlayed"
    class="
      middle-table
      col-start-2
      row-start-2
      grid grid-cols-2
      justify-items-center
      p-12
      border-4
      rounded-full
      ring-2 ring-teal-300 ring-inset
      shadow-2xl
    "
  >
    <CardStack
      @drawCard="drawCard({ playerName: player.name, game })"
      :disabled="disableCardActions"
      class="self-center"
    />
    <div class="relative h-full w-full flex items-center justify-center">
      <Card v-for="card in game.cardsPlayed" :key="card.key" :card="card" randomlyRotated disabled></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGame } from '@/composables/useGame';
import { useGameBoard } from '@/composables/useGameBoard';
import { useCard } from '@/composables/useCard';

import Card from '@/components/Card.vue';
import CardStack from '@/components/Table/CardStack.vue';
import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';

export default defineComponent({
  name: 'GameTable',
  components: { Card, CardStack, PlayerAvatar },
  setup() {
    const { game, player } = useGame();
    const { drawCard } = useCard();
    const { disableCardActions } = useGameBoard();

    return {
      game,
      player,
      drawCard,
      disableCardActions,
    };
  },
});
</script>

<style lang="scss" scoped>
.middle-table {
  background: radial-gradient(var(--green-400), var(--green-800));
}
</style>
