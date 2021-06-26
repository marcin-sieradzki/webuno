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
import { useJoinGame } from '@/composables/useJoinGame';
import { useRoute } from 'vue-router';
import { useGameListeners } from '@/composables/useGameListeners';

export default defineComponent({
  name: 'Game',
  components: { GameBoard, Chat, GameWinnerDialog },
  setup() {
    const route = useRoute();
    const { player, disconnectFromGame, setGame, game, players, winner } = useGame();
    const { joinGame, loading: isJoiningGame, error: joinGameError } = useJoinGame();
    const { connectToHub, isConnected, loading, error } = useHubConnection();
    const { registerGameListeners } = useGameListeners();

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
      registerGameListeners();
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
      showWinnerModal: computed(() => {
        return winner.value.key ? true : false;
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
