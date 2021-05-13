<template>
  <div
    class="
      h-full
      w-full
      grid grid-cols-[1.5fr,3fr,1.5fr] grid-rows-[1.5fr,3fr,2.5fr]
      bg-surface-300
      relative
    "
  >
    <Card class="test"></Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import { useGame } from "@/composables/useGame";
export default defineComponent({
  name: "Table",
  components: { Card },
  setup() {
    const { players } = useGame();
    return {
      players,
    };
  },
});
</script>

<style lang="scss" scoped>
.test {
  grid-column: 2;
  grid-row: 2;
}
</style>
