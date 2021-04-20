<template>
  <div
    class="h-full w-full grid grid-cols-[1.5fr,3fr,1.5fr] grid-rows-[1.5fr,3fr,2.5fr] bg-indigo-100"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Table",
  components: { Card },
});
</script>

<style></style>
