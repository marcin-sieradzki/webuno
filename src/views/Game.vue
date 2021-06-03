<template>
  <div class="h-screen max-h-full w-full bg-surface-0 overflow-hidden game">
    <Table> </Table>
    <div class="flex flex-col flex-initial p-3">
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
  </div>
  <Dialog
    header="Game over"
    v-model:visible="showWinnerModal"
    :closable="false"
  >
    <div class="p-3 pl-0">
      <p class="pb-2">The winner is: {{ winner.name }}</p>
      <router-link :to="{ name: 'Home' }"
        ><span class="text-blue-400 hover:underline hover:text-blue-600"
          >Back to main page</span
        ></router-link
      >
    </div>
  </Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  computed,
} from "vue";

import Board from "@/components/Board.vue";
import Table from "@/components/Table.vue";
import ChatMessage from "@/components/ChatMessage.vue";

import { useHubConnection } from "@/composables/useHubConnection";
import { useGame } from "@/composables/useGame";
import { useChat } from "@/composables/useChat";
import { useRoute } from "vue-router";
import { CardPlayedResponse, Game, Message, Player } from "@/Types";

export default defineComponent({
  name: "Game",
  components: { Board, Table, ChatMessage },
  setup() {
    const chatMessage = ref("");
    const route = useRoute();

    const {
      sendMessage: useSendMessage,
      chatMessages,
      appendMessage,
    } = useChat();

    const { player, disconnectFromGame, game, joinGame, players, refreshGame } =
      useGame();

    const winner = computed(() => {
      const winnerId = game?.value?.winnerId;
      return winnerId
        ? game.value.players.find((player) => player.key == winnerId)
        : null;
    });

    const { registerListener } = useHubConnection();
    const sendMessage = () => {
      useSendMessage(chatMessage.value, player.value.name, game.value.key);
      chatMessage.value = "";
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
        await refreshGame();
      });
      registerListener("PlayerReconnected", async (response: Player) => {
        console.log("PlayerReconnected", { response });
        await refreshGame();
      });

      registerListener("MessageReceived", (data: Message) => {
        console.log("MessageReceived", { data });
        appendMessage(data);
      });
      registerListener("CardPlayed", async (data: CardPlayedResponse) => {
        await refreshGame();
      });
      registerListener("CardDrew", async (data: Game) => {
        await refreshGame();
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
      winner,
      showWinnerModal: computed(() => {
        winner?.value?.key.length ? true : false;
      }),
    };
  },
});
</script>

<style lang="scss" scoped>
.game {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 1fr;
}
</style>
