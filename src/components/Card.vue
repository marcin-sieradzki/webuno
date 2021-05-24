<template>
  <div
    class="h-60 w-40 bg-gray-50 rounded-lg border"
    @click="playCard"
    :class="classObject"
    :style="styleObject"
  >
    <div class="">{{ cardKey }}</div>
  </div>
</template>

<script lang="ts">
import { Card } from "@/Types";
import { computed, defineComponent, PropType, toRefs } from "vue";
import { useGame } from "@/composables/useGame";
export default defineComponent({
  name: "Card",
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    cardsLength: {
      type: Number,
    },
    generateRandomRotation: {
      type: Boolean,
      default: false,
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { card, generateRandomRotation, reversed, disabled } = toRefs(props);
    const { playedCards } = useGame();
    const cardKey = card.value.key;
    const canBePlayed = (card: Card, playedCards: Card[]) => {
      const latestPlayedCard = playedCards[playedCards.length - 1];
      return (
        latestPlayedCard.color == card.color ||
        latestPlayedCard.color == "inherit" ||
        card.color == "inherit" ||
        latestPlayedCard.symbol == card.symbol
      );
    };
    const playCard = () => {
      if (disabled.value) return;
      if (!canBePlayed(card.value, playedCards.value)) return;
      emit("playCard", card.value);
    };

    const classObject = computed(() => {
      return {
        "cursor-pointer": !reversed.value && !disabled.value,
        "pointer-events-none": reversed.value,
      };
    });

    const styleObject = computed(() => {
      let obj = {
        transform: null,
      };
      if (generateRandomRotation.value) {
        obj.transform = `rotate(${getRandomRotation()}) translate(${getRandomTranslateValues()})`;
      }
      return obj;
    });

    const getRandomRotation = () => {
      return `${getRandomIntInclusive(0, 180)}deg`;
    };

    const getRandomTranslateValues = () => {
      return `${getRandomIntInclusive(-10, 10)}px,${getRandomIntInclusive(
        -10,
        10
      )}px`;
    };

    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
      cardKey,
      playCard,
      styleObject,
      classObject,
    };
  },
});
</script>

<style></style>
