<template>
  <div
    class="max-h-full h-full w-full grid grid-cols-[1.5fr,3fr,1.5fr] grid-rows-[1.5fr,3fr,2.5fr] bg-indigo-100"
  >
    <div>1</div>
    <div class="flex justify-center items-center">
      <Card tableTop v-for="card in 5" :key="card" />
    </div>
    <div>3</div>
    <div class="flex-col justify-center items-center">
      <Card tableSideLeft v-for="card in 4" :key="card" />
    </div>
    <div>5</div>
    <div class="flex justify-center items-center">
      <Card tableSideRight v-for="card in 2" :key="card" />
    </div>
    <div>7</div>
    <div class="flex justify-center items-center">
      <Card tableBot v-for="card in 4" :key="card" />
    </div>
    <div>9</div>
  </div>
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
