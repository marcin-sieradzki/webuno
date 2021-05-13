import { useHubConnection } from "./useHubConnection";
import { useGame } from "./useGame";

import { computed, ref } from "vue";
import { Message } from "@/Types";

const chatMessages = ref<Message[]>([]);
const { game, player } = useGame();
const { connection } = useHubConnection();

export const useChat = () => {
  const sendMessage = async (message: string) => {
    try {
      const messageSent = await connection.value.invoke(
        "SendMessage",
        message,
        player.value.name,
        game.value.key
      );
      chatMessages.value = [...chatMessages.value, messageSent];
    } catch (e) {
      throw new Error(e);
    }
  };

  const appendMessage = (message: Message) => {
    chatMessages.value = [...chatMessages.value, message];
  };
  return {
    chatMessages: computed(() => chatMessages),
    sendMessage,
    appendMessage,
  };
};
