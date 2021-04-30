<template>
  <div class="h-screen w-full bg-indigo-400 flex justify-center items-center">
    <Board>
      <template v-slot:board>
        <Table> </Table>
      </template>
      <template v-slot:sidebar>
        <div class="flex flex-col p-3">
          <ChatMessage
            v-for="(message, i) in chatMessages"
            :key="i"
            :message="message.message"
            :playerName="message.playerName"
          ></ChatMessage>
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
import ChatMessage from "@/components/ChatMessage.vue";

import useGameConnection from "@/composables/useGameConnection";
import { useChat } from "@/composables/useChat";
import { useRoute } from "vue-router";

interface Message {
  message: string;
  playerName: string;
  gameKey: string;
}
export default defineComponent({
  name: "Game",
  components: { Board, Table, ChatMessage },
  setup() {
    const chatMessages = ref<Message[]>([]);
    const chatMessage = ref("");
    const route = useRoute();
    const chat = useChat();

    const sendMessage = () => {
      chat.sendMessage(chatMessage.value);
    };

    onMounted(async () => {
      if (!useGameConnection.getGameKey().value.length) {
        await useGameConnection.joinGame(
          route.params.gameKey.toString(),
          route.params.playerName.toString()
        );
      }

      useGameConnection.registerListener("PlayerJoined", (data) => {
        console.log(data);
      });

      useGameConnection.registerListener("MessageReceived", (data: Message) => {
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
