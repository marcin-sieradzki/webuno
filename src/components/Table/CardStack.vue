<template>
  <Card
    :disabled="disabled"
    reversed
    type="stack"
    @drawCard="$emit('drawCard')"
    class="z-10"
    :absolute="false"
  ></Card>
</template>

<script>
import Card from "@/components/Card.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardStack",
  components: {
    Card,
  },
  props: {
    disabled: Boolean,
  },
});
</script>
