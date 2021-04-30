<template>
  <div class="h-screen w-full bg-indigo-400 flex justify-center items-center">
    <Board>
      <template v-slot:board>
        <Table> </Table>
      </template>
      <template v-slot:sidebar>
        <div class="flex flex-col">
          <span v-for="(message, i) in chatMessages" :key="i" class="mb-3">{{
            message
          }}</span>
          <InputText type="text" v-model="chatMessage" />
          <Button label="send" @click="sendMessage" />
        </div>
      </template>
    </Board>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Board from "@/components/Board.vue";
import Table from "@/components/Table.vue";

import useGameConnection from "@/composables/useGameConnection";
import useChat from "@/composables/useChat";

export default defineComponent({
  name: "Game",
  components: { Board, Table },
  setup() {
    const chatMessages = ref([]);
    const chatMessage = ref("");

    const sendMessage = () => {
      useChat.sendMessage(chatMessage);
    };

    onMounted(async () => {
      if (!useGameConnection.connection.value) {
        await useGameConnection.connect();
      }
      useGameConnection.registerListener("PlayerJoined", (data) => {
        console.log(data);
      });
      useGameConnection.registerListener("MessageReceived", (data) => {
        console.log(data);
        chatMessages.value = [...chatMessages.value, data];
      });
    });

    return {
      chatMessages,
      chatMessage,
      sendMessage,
    };
  },
});
</script>

<style></style>
