<template>
  <div class="h-screen w-full bg-surface-300 relative">
    <Button
      label="Draw a card"
      @click="drawCard(gamePlayer.name, game)"
      class="absolute top-52 left-64"
    />
    <div
      class="
        absolute
        top-0
        left-0
        h-full
        w-full
        transform
        translate-x-[40%] translate-y-[30%]
      "
    >
      <div class="relative" v-if="game && game.cardsPlayed">
        <Card
          class="absolute"
          v-for="card in game.cardsPlayed"
          :key="card.key"
          :card="card"
          generateRandomRotation
          disabled
        ></Card>
      </div>
    </div>
    <div
      v-for="player in players"
      :key="player.key"
      class="absolute flex"
      :class="getCardsPosition(player)"
    >
      <template v-if="player.playerCards">
        <Card
          :reversed="shouldReverseCard(player, gamePlayer.name)"
          :data-sit-index="player.sitIndex"
          v-for="card in player.playerCards"
          :key="card.key"
          :card="card"
          :cardsLength="7"
          @playCard="onPlayCard"
          :disabled="!isPlayerTurn"
        ></Card>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Card from "@/components/Card.vue";
import { useGame } from "@/composables/useGame";
import { useTable } from "@/composables/useTable";
import { Card as CardType, Player } from "@/Types";

export default defineComponent({
  name: "Table",
  components: { Card },
  setup() {
    const { players, playCard, player, game, currentTurn, drawCard } =
      useGame();
    const { getCardsPosition } = useTable();

    const onPlayCard = async (card: CardType) => {
      await playCard(game.value.key, player.value.name, card);
    };

    const shouldReverseCard = (playerToCheck: Player, playerName: string) => {
      return playerToCheck.name !== playerName;
    };

    const isPlayerTurn = computed(() => {
      return currentTurn.value === player.value.name;
    });

    return {
      players,
      gamePlayer: player,
      getCardsPosition,
      playCard,
      onPlayCard,
      game,
      shouldReverseCard,
      isPlayerTurn,
      currentTurn,
      drawCard,
    };
  },
});
</script>

<style lang="scss" scoped></style>
