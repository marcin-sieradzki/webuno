import { CardPlayedResponse, Game, Player } from '@/Types';
import { useGameService } from './useGameService';
import { useHubConnection } from './useHubConnection';

export function registerListeners(registerListener: Function, refreshGame: Function, game: Game) {
  registerListener('PlayerJoined', async (player: Player) => {
    console.log('PlayerJoined', { player });
    await refreshGame(game);
  });

  registerListener('PlayerReconnected', async (player: Player) => {
    console.log('PlayerReconnected', { player });
    await refreshGame(game);
  });

  registerListener('CardPlayed', async (data: CardPlayedResponse) => {
    console.log('MessageReceived', { data });
    await refreshGame(game);
  });

  registerListener('CardDrew', async (data: CardPlayedResponse) => {
    console.log('CardDrew', { data });
    await refreshGame(game);
  });
}

export const useGameListeners = () => {
  const { refreshGame, game } = useGameService();
  const { registerListener } = useHubConnection();

  function registerGameListeners() {
    return registerListeners(registerListener, refreshGame, game.value);
  }

  return {
    registerGameListeners,
  };
};
