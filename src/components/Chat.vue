<template>
  <div class="w-96 h-40 absolute bottom-14 left-3">
    <div class="h-full overflow-y-auto">
      <template v-if="chatMessages.length > 0">
        <ChatMessage
          v-for="(message, i) in chatMessages"
          :key="i"
          :message="message.message"
          :playerName="message.playerName"
        ></ChatMessage>
      </template>
    </div>
    <div class="w-full flex">
      <InputText @keypress.enter="sendMessage" type="text" class="w-full" v-model="chatMessage" />
      <Button label="send" @click="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';
import { useGame } from '@/composables/useGame';
import { useChat } from '@/composables/useChat';

export default defineComponent({
  name: 'Chat',
  components: { ChatMessage },
  setup() {
    const chatMessage = ref('');
    const { sendMessage: useSendMessage, chatMessages } = useChat();

    const { player, game } = useGame();

    const sendMessage = () => {
      useSendMessage(chatMessage.value, player.value.name, game.value.key);
      chatMessage.value = '';
    };
    return {
      chatMessage,
      sendMessage,
      chatMessages,
    };
  },
});
</script>
