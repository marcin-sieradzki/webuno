<template>
  <div
    class="
      card
      h-52
      w-36
      min-w-36
      max-w-36
      bg-gray-50
      rounded-lg
      border-4
      shadow-md
    "
    @click="playCard"
    :class="[classObject, cardColor]"
    :style="styleObject"
  >
    <div
      v-if="!reversed"
      class="
        w-full
        h-full
        border-4
        rounded-[50%]
        transform
        rotate-18
        flex
        items-center
        justify-center
        text-white
        font-bold
      "
    >
      <span class="transform rotate-negative-18 text-5xl">
        {{ cardSymbol }}</span
      >
      <span class="transform rotate-negative-18 absolute top-5 -left-5">
        {{ cardSymbol }}</span
      >
      <span class="transform rotate-negative-18 absolute bottom-5 -right-5">
        {{ cardSymbol }}</span
      >
    </div>
    <div
      class="
        w-full
        h-full
        border-4
        rounded-[50%]
        transform
        rotate-18
        flex
        items-center
        justify-center
      "
      v-if="reversed"
    >
      <span class="transform rotate-negative-18 text-white font-bold text-xl"
        >WEBUNO</span
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { Card, CardType, CardTypeEnum } from '@/Types';
  import { computed, defineComponent, PropType, toRefs } from 'vue';
  import { useGame } from '@/composables/useGame';
  export default defineComponent({
    name: 'Card',
    props: {
      card: {
        type: Object as PropType<Card>,
      },
      cards: {
        type: Array as PropType<Card[]>,
        default: () => [],
      },
      randomlyRotated: {
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
      absolute: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String as PropType<CardType>,
        default: 'hand',
      },
    },
    setup(props, { emit }) {
      const {
        card,
        randomlyRotated,
        reversed,
        disabled,
        cards,
        absolute,
        type,
      } = toRefs(props);
      const { playedCards } = useGame();
      const cardSymbol = computed(() => {
        return card?.value?.symbol.length < 3
          ? card.value.symbol
          : card.value.symbol.charAt(0).toUpperCase();
      });

      const cardColor = computed(() => {
        if (reversed.value) {
          return 'bg-red-900';
        }
        switch (card.value.color) {
          case 'red':
            return 'bg-red-900';
          case 'yellow':
            return 'bg-yellow-400';
          case 'green':
            return 'bg-green-400';
          case 'blue':
            return 'bg-blue-400';
          default:
            return 'bg-teal-400';
        }
      });

      const canBePlayed = (card: Card, playedCards: Card[]) => {
        const latestPlayedCard = playedCards[playedCards.length - 1];
        return (
          latestPlayedCard.color == card.color ||
          latestPlayedCard.color == 'inherit' ||
          card.color == 'inherit' ||
          latestPlayedCard.symbol == card.symbol
        );
      };
      const playCard = () => {
        if (type.value === CardTypeEnum.stack) {
          emit('drawCard');
          return;
        }
        if (disabled.value || reversed.value) return;
        if (!canBePlayed(card.value, playedCards.value)) return;
        emit('playCard', card.value);
      };

      const classObject = computed(() => {
        return {
          'cursor-pointer':
            (!reversed.value && !disabled.value) ||
            type.value === CardTypeEnum.stack,
          'pointer-events-none':
            (reversed.value && type.value !== CardTypeEnum.stack) ||
            disabled.value, //change
          'hover:z-10': type.value === CardTypeEnum.hand,
          'hover:bottom-7': type.value === CardTypeEnum.hand,
          absolute: absolute.value,
        };
      });

      const styleObject = computed(() => {
        let styles = {};
        if (randomlyRotated.value) {
          styles = {};
        }
        styles = {
          ...styles,
          transform: buildTransform(),
          transformOrigin: randomlyRotated.value ? 'default' : 'center',
        };
        return styles;
      });

      const buildTransform = () => {
        //TODO: Strategy patttern
        if (type.value === CardTypeEnum.stack) {
          return '';
        }
        if (randomlyRotated.value) {
          return randomRotation.value;
        }
        const cardIndex = cards.value.findIndex(
          (c) => c.key === card.value.key
        );
        return `translate(${cardIndex * 2.5}rem)`;
      };

      const randomRotation = computed(() => {
        return `rotate(${getRandomRotation()}) translate(${getRandomTranslateValues()})`;
      });

      const getRandomRotation = () => {
        return `${getRandomIntInclusive(-60, 60)}deg`;
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
        cardSymbol,
        playCard,
        styleObject,
        classObject,
        cardColor,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .card {
    transition: bottom 0.2s linear;
  }
</style>
