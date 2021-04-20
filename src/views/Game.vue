<template>
  <div class="h-screen w-full bg-indigo-400 flex justify-center items-center">
    <Board>
      <template v-slot:board>
        <Table> </Table>
      </template>
      <template v-slot:sidebar>
        <h1>jajo</h1>
      </template>
    </Board>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Board from "@/components/Board.vue";
import Table from "@/components/Table.vue";

export default defineComponent({
  name: "Game",
  components: { Board, Table },
});
</script>

<style></style>
