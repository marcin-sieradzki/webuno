import { CardPlayedResponse, Game, Player } from '@/Types';
import { useGame } from './useGame';
import { useHubConnection } from './useHubConnection';

export function registerListeners(registerListener: Function, fetchGame: Function, setGame: Function, game: Game) {
  registerListener('PlayerJoined', async (player: Player) => {
    console.log('PlayerJoined', { player });
    const refreshedGame = await fetchGame(game);
    setGame(refreshedGame);
  });

  registerListener('PlayerReconnected', async (player: Player) => {
    console.log('PlayerReconnected', { player });
    const refreshedGame = await fetchGame(game);
    setGame(refreshedGame);
  });

  registerListener('CardPlayed', async (data: CardPlayedResponse) => {
    console.log('MessageReceived', { data });
    const refreshedGame: Game = await fetchGame(game);
    setGame(refreshedGame);
    // setTimeout(() => {
    //   const playedCard = refreshedGame.cardsPlayed.find((c) => c.key === data.card.key);
    //   const event = new CustomEvent('CardPlayed', { detail: playedCard });
    //   window.dispatchEvent(event);
    // }, 10);
  });

  registerListener('CardDrew', async (data: CardPlayedResponse) => {
    console.log('CardDrew', { data });
    const refreshedGame = await fetchGame(game);
    setGame(refreshedGame);
  });
  registerListener('GameWon', async (winnerId: string) => {
    const refreshedGame = { ...game, winnerId };
    setGame(refreshedGame);
  });
}

export const useGameListeners = () => {
  const { fetchGame, game, setGame } = useGame();
  const { registerListener } = useHubConnection();

  function registerGameListeners() {
    return registerListeners(registerListener, fetchGame, setGame, game.value);
  }

  return {
    registerGameListeners,
  };
};
