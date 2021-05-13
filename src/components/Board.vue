<template>
  <div class="h-5/6 w-4/5 grid grid-cols-[6fr,1.5fr] bg-indigo-100 max-h-full">
    <div class="bg-red-600"><slot name="board"></slot></div>
    <div class="bg-green-600"><slot name="sidebar"></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Board",
  components: {},
});
</script>

<style></style>
