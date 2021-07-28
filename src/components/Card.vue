<template>
  <div
    data-test="Card"
    class="card h-[22vmin] w-[16vmin] bg-gray-50 rounded-lg border-4 shadow-md"
    @click="cardClicked(card)"
    :class="[classObject, cardColor]"
    :style="styleObject"
  >
    <CardFace v-if="!reversed" data-test="Card-Front">
      <span class="transform rotate-negative-18 text-5xl" data-test="Card-Symbol"> {{ cardSymbol }}</span>
      <span class="transform rotate-negative-18 absolute top-5 -left-5" data-test="Card-Symbol"> {{ cardSymbol }}</span>
      <span class="transform rotate-negative-18 absolute bottom-5 -right-5" data-test="Card-Symbol">
        {{ cardSymbol }}</span
      >
    </CardFace>
    <CardFace v-if="reversed" data-test="Card-Back">
      <span class="transform rotate-negative-18 text-white font-bold xl:text-xl md:text-base">WEBUNO</span>
    </CardFace>
  </div>
</template>

<script lang="ts">
import CardFace from '@/components/CardFace.vue';

import { Card } from '@/Types';
import { Ref, unref } from 'vue';
import { defineComponent, PropType, toRefs } from 'vue';
import { useCard } from '@/composables/useCard';

export default defineComponent({
  name: 'Card',
  components: {
    CardFace,
  },
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

    const { cardSymbol, cardColor, classObject, styleObject } = useCard({
      card,
      randomlyRotated,
      reversed,
      absolute,
      popupOnHover,
      indexInStack,
      translateLeft,
      allowInteraction,
    });

    const cardClicked = (clickedCard: Ref<Card>) => {
      if (!allowInteraction.value) return;
      emit('cardClicked', unref(clickedCard));
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
  transition: bottom 0.2s ease-in-out;
}
</style>
