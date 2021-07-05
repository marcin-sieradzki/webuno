<template>
  <div
    data-test="Card"
    class="card h-52 w-36 min-w-36 max-w-36 bg-gray-50 rounded-lg border-4 shadow-md"
    @click="cardClicked(card)"
    :class="[classObject, cardColor]"
    :style="styleObject"
  >
    <div
      v-if="!reversed"
      data-test="Card-Front"
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
      <span class="transform rotate-negative-18 text-5xl" data-test="Card-Symbol"> {{ cardSymbol }}</span>
      <span class="transform rotate-negative-18 absolute top-5 -left-5" data-test="Card-Symbol"> {{ cardSymbol }}</span>
      <span class="transform rotate-negative-18 absolute bottom-5 -right-5" data-test="Card-Symbol">
        {{ cardSymbol }}</span
      >
    </div>
    <div
      data-test="Card-Back"
      class="w-full h-full border-4 rounded-[50%] transform rotate-18 flex items-center justify-center"
      v-if="reversed"
    >
      <span class="transform rotate-negative-18 text-white font-bold text-xl">WEBUNO</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, unref } from 'vue';
import { Card } from '@/Types';
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { getRandomNumber } from '@/utils/shared/numberUtils';
export default defineComponent({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<Ref<Card>>,
    },
    randomlyRotated: {
      type: Boolean,
      default: false,
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    popupOnHover: {
      type: Boolean,
      default: false,
    },
    indexInStack: {
      type: Number,
      default: 0,
    },
    translateLeft: {
      type: Boolean,
      default: false,
    },
    allowInteraction: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { card, randomlyRotated, reversed, absolute, popupOnHover, indexInStack, translateLeft, allowInteraction } =
      toRefs(props);

    const cardClicked = (clickedCard: Ref<Card>) => {
      if (!allowInteraction.value) return;
      emit('cardClicked', unref(clickedCard));
    };

    const cardSymbol = computed(() => {
      return card?.value?.symbol.length < 3 ? card.value.symbol : card.value.symbol.charAt(0).toUpperCase();
    });

    const cardColor = computed(() => {
      if (reversed.value) {
        return 'bg-red-500';
      }
      switch (card.value.color) {
        case 'red':
          return 'bg-red-500';
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

    const classObject = computed(() => {
      return {
        'cursor-pointer': allowInteraction.value,
        'pointer-events-none': !allowInteraction.value,
        'hover:z-10': popupOnHover.value,
        'hover:bottom-7': popupOnHover.value,
        absolute: absolute.value,
      };
    });

    const styleObject = computed(() => {
      return {
        transform: buildTransform(),
        transformOrigin: randomlyRotated.value ? 'default' : 'center',
      };
    });

    const buildTransform = () => {
      if (randomlyRotated.value) {
        return randomRotation.value;
      }
      if (translateLeft.value) {
        return `translate(${indexInStack.value * 2.5}rem)`;
      }
      return '';
    };

    const randomRotation = computed(() => {
      return `rotate(${getRandomRotation()}) translate(${getRandomTranslateValues()})`;
    });

    const getRandomRotation = () => {
      return `${getRandomNumber(-60, 60)}deg`;
    };

    const getRandomTranslateValues = () => {
      return `${getRandomNumber(-10, 10)}px,${getRandomNumber(-10, 10)}px`;
    };

    return {
      cardSymbol,
      cardClicked,
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
