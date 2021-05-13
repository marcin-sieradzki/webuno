<template>
  <div
    class="
      h-screen
      w-full
      bg-surface-0
      flex
      justify-center
      items-center
      overflow-hidden
    "
  >
    <Board>
      <template v-slot:board>
        <Table> </Table>
      </template>
      <template v-slot:sidebar>
        <div class="flex flex-col p-3">
          <template v-if="chatMessages?.length">
            <ChatMessage
              v-for="(message, i) in chatMessages"
              :key="i"
              :message="message.message"
              :playerName="message.playerName"
            ></ChatMessage>
          </template>

          <InputText type="text" v-model="chatMessage" />
          <Button label="send" @click="sendMessage" />
        </div>
      </template>
    </Board>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from "vue";

import Board from "@/components/Board.vue";
import Table from "@/components/Table.vue";
import ChatMessage from "@/components/ChatMessage.vue";

import { useHubConnection } from "@/composables/useHubConnection";
import { useGame } from "@/composables/useGame";
import { useChat } from "@/composables/useChat";
import { useRoute } from "vue-router";
import { Card, Message, Player } from "@/Types";

export default defineComponent({
  name: "Game",
  components: { Board, Table, ChatMessage },
  setup() {
    const chatMessage = ref("");
    const route = useRoute();
    const test = useGame();
    const {
      sendMessage: useSendMessage,
      chatMessages,
      appendMessage,
    } = useChat();

    const {
      player,
      disconnectFromGame,
      playCard: usePlayCard,
      game,
      joinGame,
      players,
      appendPlayer,
    } = useGame();

    const { registerListener } = useHubConnection();
    const sendMessage = () => {
      useSendMessage(chatMessage.value);
    };

    const disconnect = async () => {
      await disconnectFromGame();
    };

    onMounted(async () => {
      if (!game.value?.key?.length) {
        await joinGame(
          route.params.gameKey.toString(),
          route.params.playerName.toString()
        );
      }

      registerListener("PlayerJoined", async (response: Player) => {
        console.log("PlayerJoined");
        appendPlayer(response);
      });
      registerListener("PlayerReconnected", (response: Player) => {
        console.log("PlayerReconnected", { response });
        appendPlayer(response);
      });

      registerListener("MessageReceived", (data: Message) => {
        console.log("MessageReceived", { data });
        appendMessage(data);
      });
    });
    onBeforeUnmount(async () => {
      await disconnectFromGame();
    });
    return {
      chatMessage,
      sendMessage,
      game,
      disconnect,
      player,
      chatMessages,
      players,
      test,
    };
  },
});
</script>

<style></style>
