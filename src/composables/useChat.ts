import { useHubConnection } from './useHubConnection';

import { computed, ref } from 'vue';
import { Message } from '@/Types';

const chatMessages = ref<Message[]>([]);
const { connection } = useHubConnection();

export const useChat = () => {
  const sendMessage = async (
    message: string,
    playerName: string,
    gameKey: string
  ) => {
    try {
      const messageSent = await connection.value.invoke(
        'SendMessage',
        message,
        playerName,
        gameKey
      );
      return messageSent;
    } catch (e) {
      throw new Error(e);
    }
  };

  const appendMessage = (message: Message) => {
    chatMessages.value = [...chatMessages.value, message];
  };
  return {
    chatMessages: computed(() => chatMessages.value),
    sendMessage,
    appendMessage,
  };
};
