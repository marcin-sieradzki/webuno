<template>
  <div
    v-for="player in players"
    :key="player.key"
    class="flex relative"
    :class="getCardsPosition(player)"
  >
    <div v-if="player.playerCards" class="relative">
      <PlayerAvatar
        class="absolute right-0"
        :playerName="player.name"
        :rotate="getAvatarRotation(player.sitIndex)"
        :active="currentTurn === player.name"
      />
      <Card
        :reversed="shouldReverseCard(player, gamePlayer.name)"
        :data-sit-index="player.sitIndex"
        v-for="card in player.playerCards"
        :key="card.key"
        :card="card"
        :cards="player.playerCards"
        @playCard="
          playCard({ gameKey: game.key, playerName: player.name, card })
        "
        :disabled="disableCardActions"
        class="bottom-2"
      ></Card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGame } from '@/composables/useGame';
  import { useTable } from '@/composables/useTable';
  import { Card as CardType, Player } from '@/Types';

  import Card from '@/components/Card.vue';
  import CardStack from '@/components/Table/CardStack.vue';
  import PlayerAvatar from '@/components/Table/PlayerAvatar.vue';
  import MiddleTable from '@/components/Table/MiddleTable.vue';

  export default defineComponent({
    name: 'PlayerSeats',
    components: { Card, CardStack, PlayerAvatar, MiddleTable },
    setup() {
      const { players, player, game, currentTurn } = useGame();
      console.log({ players, player, game, currentTurn });
      const { playCard, disableCardActions, isPlayerTurn } = useTable();

      const shouldReverseCard = (playerToCheck: Player, playerName: string) => {
        return playerToCheck.name !== playerName;
      };

      const getCardsPosition = (cardsOwner: Player) => {
        const { player } = useGame();

        // if (cardsOwner.name === player.value.name) {
        //   return "col-start-2 row-start-3";
        // }

        switch (cardsOwner.sitIndex) {
          case 1:
            return 'col-start-2 row-start-3';
          case 2:
            return 'col-start-1 row-start-2 transform rotate-90';
          case 3:
            return 'col-start-2 row-start-1 transform rotate-180';
          case 4:
            return 'col-start-3 row-start-2 transform rotate-270';
          default:
            break;
        }
      };

      const getAvatarRotation = (sitIndex: number) => {
        switch (sitIndex) {
          case 1:
            return 'rotate-0';
          case 2:
            return '-rotate-90';
          case 3:
            return 'rotate-180';
          case 4:
            return 'rotate-90';
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
        getAvatarRotation,
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
