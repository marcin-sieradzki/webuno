<template>
  <div
    v-if="game && playedCards"
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
      xl:min-w-[530px]
      sm:min-w-[430px]
    "
  >
    <CardStack
      @drawCard="drawCard({ playerName: player.name, game })"
      :disabled="disableCardActions"
      class="self-center"
    />
    <div class="relative h-full w-full flex items-center justify-center">
      <Card
        v-for="card in playedCards"
        :key="card.key"
        :card="card"
        randomlyRotated
        absolute
        :allowInteraction="false"
        class="played-card"
      ></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, watch, nextTick } from 'vue';
import { useGame } from '@/composables/useGame';
import { useGameBoard } from '@/composables/useGameBoard';
import { useCardService } from '@/composables/useCardService';
import { useAnimateCard } from '@/composables/useAnimateCard';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { ActionTypes } from '@/utils/enums/actionTypes';

import Card from '@/components/Card.vue';
import CardStack from '@/components/Table/CardStack.vue';
import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';

export default defineComponent({
  name: 'GameTable',
  components: { Card, CardStack, PlayerAvatar },
  setup() {
    const { game, player, playedCards } = useGame();
    const { drawCard } = useCardService();
    const { disableCardActions } = useGameBoard();
    const { animatePlayedCard } = useAnimateCard();
    const latestAction: Ref<string> = sharedRef<string>('latestAction');

    watch(playedCards, async (cards) => {
      if (latestAction.value !== ActionTypes.CardPlayed) return;
      await nextTick();
      animatePlayedCard(cards[cards.length - 1]);
    });

    return {
      game,
      player,
      drawCard,
      disableCardActions,
      playedCards,
    };
  },
});
</script>

<style lang="scss" scoped>
.middle-table {
  background: radial-gradient(var(--green-400), var(--green-800));
}
</style>
