<template>
  <div v-for="player in players" :key="player.key" class="flex relative" :class="getCardsPosition(player)">
    <div v-if="player.playerCards" class="relative">
      <PlayerAvatar class="absolute right-0" :playerName="player.name" :active="currentTurn === player.name" />
      <Card
        :reversed="shouldReverseCard(player, gamePlayer.name)"
        :data-sit-index="player.sitIndex"
        v-for="card in player.playerCards"
        :key="card.key"
        :card="card"
        :cards="player.playerCards"
        @playCard="playCard({ gameKey: game.key, playerName: player.name, card })"
        :disabled="disableCardActions"
        class="bottom-2"
      ></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGame } from '@/composables/useGame';
import { useGameBoard } from '@/composables/useGameBoard';
import { useCard } from '@/composables/useCard';
import { Player } from '@/Types';

import Card from '@/components/Card.vue';
import CardStack from '@/components/Table/CardStack.vue';
import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';
import GameTable from '@/components/Table/GameTable.vue';

export default defineComponent({
  name: 'PlayerSeats',
  components: { Card, CardStack, PlayerAvatar, GameTable },
  setup() {
    const { players, player, game, currentTurn } = useGame();
    const { playCard } = useCard();
    const { disableCardActions, isPlayerTurn } = useGameBoard();

    const shouldReverseCard = (playerToCheck: Player, playerName: string) => {
      return playerToCheck.name !== playerName;
    };

    const getCardsPosition = (cardsOwner: Player) => {
      //TODO: Make it in a more clever way? :D
      if (cardsOwner.name === player.value.name) {
        return 'col-start-2 row-start-3';
      }

      switch (player.value.sitIndex) {
        case 1:
          if (cardsOwner.sitIndex == 2) {
            return 'col-start-1 row-start-2 transform rotate-90';
          }
          if (cardsOwner.sitIndex == 3) {
            return 'col-start-2 row-start-1 transform rotate-180';
          }
          if (cardsOwner.sitIndex == 4) {
            return 'col-start-3 row-start-2 transform rotate-270';
          }
        case 2:
          if (cardsOwner.sitIndex == 3) {
            return 'col-start-1 row-start-2 transform rotate-90';
          }
          if (cardsOwner.sitIndex == 4) {
            return 'col-start-2 row-start-1 transform rotate-180';
          }
          if (cardsOwner.sitIndex == 1) {
            return 'col-start-3 row-start-2 transform rotate-270';
          }
        case 3:
          if (cardsOwner.sitIndex == 4) {
            return 'col-start-1 row-start-2 transform rotate-90';
          }
          if (cardsOwner.sitIndex == 1) {
            return 'col-start-2 row-start-1 transform rotate-180';
          }
          if (cardsOwner.sitIndex == 2) {
            return 'col-start-3 row-start-2 transform rotate-270';
          }
        case 4:
          if (cardsOwner.sitIndex == 1) {
            return 'col-start-1 row-start-2 transform rotate-90';
          }
          if (cardsOwner.sitIndex == 2) {
            return 'col-start-2 row-start-1 transform rotate-180';
          }
          if (cardsOwner.sitIndex == 3) {
            return 'col-start-3 row-start-2 transform rotate-270';
          }
        default:
          break;
      }
    };

    return {
      players,
      gamePlayer: player,
      getCardsPosition,
      game,
      shouldReverseCard,
      currentTurn,
      playCard,
      disableCardActions,
      isPlayerTurn,
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
