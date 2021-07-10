<template>
  <div
    v-for="player in players"
    :key="player.key"
    class="flex relative"
    :class="calculatePositions(player, gamePlayer).cardsRotation"
  >
    <div v-if="player.playerCards" class="relative">
      <PlayerAvatar
        class="absolute right-0"
        :playerName="player.name"
        :active="currentTurn === player.name"
        :rotate="calculatePositions(player, gamePlayer).avatarRotation"
      />
      <template v-for="card in player.playerCards" :key="card.key">
        <Card
          class="bottom-2"
          translateLeft
          absolute
          popupOnHover
          :reversed="!isPlayerCard(player.name, gamePlayer.name)"
          :card="card"
          :allowInteraction="!disableCardActions && isPlayerCard(player.name, gamePlayer.name)"
          :indexInStack="getCardIndex(card.key, player.playerCards)"
          @cardClicked="playCard({ gameKey: game.key, playerName: player.name, cardToPlay: card })"
        ></Card>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGame } from '@/composables/useGameService';
import { useGameBoard } from '@/composables/useGameBoard';
import { useCardService } from '@/composables/useCardService';
import { usePlayerSeats } from '@/composables/usePlayerSeats';

import Card from '@/components/Card.vue';
import CardStack from '@/components/Table/CardStack.vue';
import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';
import GameTable from '@/components/Table/GameTable.vue';

export default defineComponent({
  name: 'PlayerSeats',
  components: { Card, CardStack, PlayerAvatar, GameTable },
  setup() {
    const { players, player, game, currentTurn, playedCards } = useGame();
    const { playCard } = useCardService();
    const { disableCardActions } = useGameBoard();
    const { isPlayerCard, getCardIndex, calculatePositions } = usePlayerSeats();

    return {
      players,
      gamePlayer: player,
      calculatePositions,
      game,
      isPlayerCard,
      currentTurn,
      playCard,
      disableCardActions,
      playedCards,
      getCardIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.game-table {
  transform: translateY(-5vh) rotateX(30deg);
  transform-style: preserve-3d;
  background: radial-gradient(var(--blue-500), var(--surface-100));
}
</style>
