<template>
  <div
    class="bg-gray-50 border-8 border-double rounded-lg border-green-300 grid grid-cols-[1fr,3fr,1fr] grid-rows-[1fr,3fr,1fr]"
    :class="classObject"
  >
    <div class="flex justify-center items-center">5</div>
    <div></div>
    <div></div>
    <div></div>
    <div class="flex justify-center items-center">5</div>
    <div></div>
    <div></div>
    <div></div>
    <div class="flex justify-center items-center">5</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Card",

  props: {
    tableTop: Boolean,
    tableBot: Boolean,
    tableSideLeft: Boolean,
    tableSideRight: Boolean,
  },
  computed: {
    classObject() {
      return {
        "h-44 w-20 transform rotate-180": this.tableTop,
        "h-44 w-20 transform rotate-[270deg]": this.tableSideRight,
        "h-56 w-36": this.tableBot,
        "h-44 w-20 transform rotate-90": this.tableSideLeft,
      };
    },
  },
});
</script>

<style></style>
