<template>
  <div class="card-stack">
    <Card
      data-test="CardStack-Card"
      :allowInteraction="!disabled"
      reversed
      type="stack"
      @cardClicked="$emit('drawCard')"
      class="z-10"
      :absolute="false"
    ></Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardStack',
  components: {
    Card,
  },
  props: {
    disabled: Boolean,
  },
});
</script>
