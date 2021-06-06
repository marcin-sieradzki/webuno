<template>
  <div
    v-if="game && game.players.length"
    class="game h-screen max-h-full w-full overflow-hidden relative"
  >
    <Table> </Table>
    <Chat></Chat>
    <GameWinnerDialog />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onBeforeUnmount, computed } from 'vue';

  import Board from '@/components/Board.vue';
  import Table from '@/components/Table.vue';
  import GameWinnerDialog from '@/components/Dialogs/GameWinnerDialog.vue';
  import Chat from '@/components/Chat.vue';

  import { useHubConnection } from '@/composables/useHubConnection';
  import { useGame } from '@/composables/useGame';
  import { useChat } from '@/composables/useChat';

  import { useRoute } from 'vue-router';
  import { CardPlayedResponse, Game, Message, Player } from '@/Types';

  export default defineComponent({
    name: 'Game',
    components: { Board, Table, Chat, GameWinnerDialog },
    setup() {
      const route = useRoute();

      const {
        player,
        disconnectFromGame,
        game,
        joinGame,
        players,
        refreshGame,
      } = useGame();
      const { appendMessage } = useChat();
      const winner = computed(() => {
        const winnerId = game?.value?.winnerId;
        return winnerId
          ? game.value.players.find((player) => player.key == winnerId)
          : null;
      });

      const { registerListener } = useHubConnection();

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

        registerListener('PlayerJoined', async (response: Player) => {
          console.log('PlayerJoined');
          await refreshGame();
        });
        registerListener('PlayerReconnected', async (response: Player) => {
          console.log('PlayerReconnected', { response });
          await refreshGame();
        });

        registerListener('MessageReceived', (data: Message) => {
          console.log('MessageReceived', { data });
          appendMessage(data);
        });
        registerListener('CardPlayed', async (data: CardPlayedResponse) => {
          await refreshGame();
        });
        registerListener('CardDrew', async (data: Game) => {
          await refreshGame();
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
        showWinnerModal: computed(() => {
          winner?.value?.key.length ? true : false;
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
