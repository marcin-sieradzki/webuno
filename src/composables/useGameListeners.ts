import { CardPlayedResponse, Game, Player } from '@/Types';
import { useGame } from './useGame';
import { useHubConnection } from './useHubConnection';

export function registerListeners(registerListener: Function, fetchGame: Function, game: Game) {
  registerListener('PlayerJoined', async (player: Player) => {
    console.log('PlayerJoined', { player });
    await fetchGame(game);
  });

  registerListener('PlayerReconnected', async (player: Player) => {
    console.log('PlayerReconnected', { player });
    await fetchGame(game);
  });

  registerListener('CardPlayed', async (data: CardPlayedResponse) => {
    console.log('MessageReceived', { data });
    await fetchGame(game);
  });

  registerListener('CardDrew', async (data: CardPlayedResponse) => {
    console.log('CardDrew', { data });
    await fetchGame(game);
  });
}

export const useGameListeners = () => {
  const { fetchGame, game } = useGame();
  const { registerListener } = useHubConnection();

  function registerGameListeners() {
    return registerListeners(registerListener, fetchGame, game.value);
  }

  return {
    registerGameListeners,
  };
};
