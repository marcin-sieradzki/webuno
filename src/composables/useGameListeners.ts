import { CardPlayedResponse, Message, Player } from '@/Types';
import { useGame } from './useGame';
import { useHubConnection } from './useHubConnection';
import { useChat } from './useChat';

export const useGameListeners = () => {
  const { refreshGame, game } = useGame();
  const { registerListener } = useHubConnection();
  const { appendMessage } = useChat();

  function registerGameListeners() {
    registerListener('PlayerJoined', async (player: Player) => {
      console.log('PlayerJoined', { player });
      await refreshGame(game.value);
    });

    registerListener('PlayerReconnected', async (player: Player) => {
      console.log('PlayerReconnected', { player });
      await refreshGame(game.value);
    });

    registerListener('MessageReceived', (data: Message) => {
      console.log('MessageReceived', { data });
      appendMessage(data);
    });

    registerListener('CardPlayed', async (data: CardPlayedResponse) => {
      console.log('MessageReceived', { data });
      await refreshGame(game.value);
    });

    registerListener('CardDrew', async (data: CardPlayedResponse) => {
      console.log('CardDrew', { data });
      await refreshGame(game.value);
    });
  }

  return {
    registerGameListeners,
  };
};
