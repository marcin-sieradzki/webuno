import { CardPlayedResponse, Game, Player } from '@/Types';
import { ActionTypes } from '@/utils/enums/actionTypes';
import { useGame } from './useGame';
import { useHubConnection } from './useHubConnection';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { Ref } from 'vue';

export const useGameListeners = () => {
  const { fetchGame, game, setGame } = useGame();
  const { registerListener } = useHubConnection();

  function registerGameListeners() {
    const latestAction: Ref<string> = sharedRef<string>('latestAction', '');

    registerListener(ActionTypes.PlayerJoined, async (player: Player) => {
      console.log('PlayerJoined', { player });
      latestAction.value = ActionTypes.PlayerJoined;
      const refreshedGame = await fetchGame(game.value);
      setGame(refreshedGame);
    });

    registerListener(ActionTypes.PlayerReconnected, async (player: Player) => {
      console.log('PlayerReconnected', { player });
      latestAction.value = ActionTypes.PlayerReconnected;
      const refreshedGame = await fetchGame(game.value);
      setGame(refreshedGame);
    });

    registerListener(ActionTypes.CardPlayed, async (data: CardPlayedResponse) => {
      console.log('CardPlayed', { data });
      latestAction.value = ActionTypes.CardPlayed;
      const refreshedGame: Game = await fetchGame(game.value);
      setGame(refreshedGame);
      // setTimeout(() => {
      //   const playedCard = refreshedGame.cardsPlayed.find((c) => c.key === data.card.key);
      //   const event = new CustomEvent('CardPlayed', { detail: playedCard });
      //   window.dispatchEvent(event);
      // }, 10);
    });

    registerListener(ActionTypes.CardDrew, async (data: CardPlayedResponse) => {
      console.log('CardDrew', { data });
      latestAction.value = ActionTypes.CardDrew;
      const refreshedGame = await fetchGame(game.value);
      setGame(refreshedGame);
    });
    registerListener(ActionTypes.GameWon, async (winnerId: string) => {
      latestAction.value = ActionTypes.GameWon;
      const refreshedGame = { ...game.value, winnerId };
      setGame(refreshedGame);
    });
  }

  return {
    registerGameListeners,
  };
};
