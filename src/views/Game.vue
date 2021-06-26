<template>
  <div v-if="game && game.players.length" class="game h-screen max-h-full w-full overflow-hidden relative">
    <GameBoard />
    <Chat />
    <GameWinnerDialog v-if="winner" :winner="winner" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, watch } from 'vue';

import GameBoard from '@/components/GameBoard.vue';
import GameWinnerDialog from '@/components/Dialogs/GameWinnerDialog.vue';
import Chat from '@/components/Chat.vue';

import { useHubConnection } from '@/composables/useHubConnection';
import { useGame } from '@/composables/useGame';
import { useChat } from '@/composables/useChat';
import { useJoinGame } from '@/composables/useJoinGame';

import { sharedRef, sharedMap } from '@/utils/shared/useSharedRef';
import { useRoute } from 'vue-router';
import { CardPlayedResponse, Game, Message, Player } from '@/Types';

export default defineComponent({
  name: 'Game',
  components: { GameBoard, Chat, GameWinnerDialog },
  setup() {
    const route = useRoute();
    const { appendMessage } = useChat();
    const { player, disconnectFromGame, setGame, game, players, refreshGame } = useGame();
    const { joinGame, loading: isJoiningGame, error: joinGameError } = useJoinGame();
    const { registerListener, connectToHub, isConnected, loading, error } = useHubConnection();

    const winner = computed(() => {
      const winnerId = game?.value?.winnerId;
      return winnerId ? game.value.players.find((player) => player.key == winnerId) : null;
    });

    const disconnect = async () => {
      await disconnectFromGame();
    };

    watch(isConnected, async (value) => {
      if (!value) {
        await connectToHub();
      }
    });

    onMounted(async () => {
      if (!game.value?.key?.length) {
        if (!isConnected.value) {
          await connectToHub();
        }

        const joinedGame = await joinGame({
          gameKey: route.params.gameKey.toString(),
          playerName: route.params.playerName.toString(),
        });

        setGame(joinedGame);
      }

      registerListener('PlayerJoined', async (response: Player) => {
        console.log('PlayerJoined');
        await refreshGame(game.value);
      });
      registerListener('PlayerReconnected', async (response: Player) => {
        console.log('PlayerReconnected', { response });
        await refreshGame(game.value);
      });

      registerListener('MessageReceived', (data: Message) => {
        console.log('MessageReceived', { data });
        appendMessage(data);
      });
      registerListener('CardPlayed', async (data: CardPlayedResponse) => {
        await refreshGame(game.value);
      });
      registerListener('CardDrew', async (data: Game) => {
        await refreshGame(game.value);
      });
    });
    onBeforeUnmount(async () => {
      await disconnectFromGame();
    });
    return {
      game,
      disconnect,
      player,
      players,
      winner,
      isJoiningGame,
      joinGameError,
      sharedRef,
      sharedMap,
      showWinnerModal: computed(() => {
        return winner.value?.key ? true : false;
      }),
    };
  },
});
</script>

<style lang="scss" scoped>
.game {
  perspective: 80em;
}
</style>
