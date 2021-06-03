<template>
  <section class="h-screen w-full grid grid-cols-3 grid-rows-3 bg-surface-300">
    <div
      v-if="game && game.cardsPlayed"
      class="col-start-2 row-start-2 flex flex-row items-center justify-around"
    >
      <CardStack
        @drawCard="drawCard(gamePlayer.name, game)"
        class="flex-1"
        :disabled="cardsDisabled"
      />
      <div class="w-full h-full relative flex-1">
        <Card
          v-for="card in game.cardsPlayed"
          :key="card.key"
          :card="card"
          randomlyRotated
          disabled
          class="right-0"
        ></Card>
      </div>
    </div>

    <div
      v-for="player in players"
      :key="player.key"
      class="flex relative items-start"
      :class="getCardsPosition(player)"
    >
      <PlayerAvatar
        :playerName="player.name"
        :rotate="getAvatarRotation(player.sitIndex)"
        :active="currentTurn === player.name"
      />
      <div v-if="player.playerCards" class="pl-12">
        <Card
          :reversed="shouldReverseCard(player, gamePlayer.name)"
          :data-sit-index="player.sitIndex"
          v-for="card in player.playerCards"
          :key="card.key"
          :card="card"
          :cards="player.playerCards"
          @playCard="onPlayCard"
          :disabled="cardsDisabled"
          :absolute="false"
        ></Card>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Card from "@/components/Card.vue";
import CardStack from "@/components/Table/CardStack.vue";
import PlayerAvatar from "@/components/Table/PlayerAvatar.vue";
import { useGame } from "@/composables/useGame";
import { useTable } from "@/composables/useTable";
import { Card as CardType, Player } from "@/Types";

export default defineComponent({
  name: "Table",
  components: { Card, CardStack, PlayerAvatar },
  setup() {
    const {
      players,
      playCard,
      player,
      game,
      currentTurn,
      drawCard,
      isPlayingCard,
    } = useGame();
    const { getCardsPosition } = useTable();

    const isPlayerTurn = computed(() => {
      return currentTurn.value === player.value.name;
    });

    const cardsDisabled = computed(() => {
      return !isPlayerTurn.value || isPlayingCard.value;
    });

    const onPlayCard = async (card: CardType) => {
      await playCard(game.value.key, player.value.name, card);
    };

    const shouldReverseCard = (playerToCheck: Player, playerName: string) => {
      return playerToCheck.name !== playerName;
    };

    const getAvatarRotation = (sitIndex: number) => {
      switch (sitIndex) {
        case 1:
          return "rotate-0";
        case 2:
          return "-rotate-90";
        case 3:
          return "rotate-180";
        case 4:
          return "rotate-90";
        default:
          break;
      }
    };

    return {
      players,
      gamePlayer: player,
      getCardsPosition,
      playCard,
      onPlayCard,
      game,
      shouldReverseCard,
      currentTurn,
      drawCard,
      cardsDisabled,
      getAvatarRotation,
    };
  },
});
</script>

<style lang="scss" scoped></style>
