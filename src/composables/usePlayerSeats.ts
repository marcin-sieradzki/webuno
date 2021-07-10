import { Card, Player } from '@/Types';

export const isPlayerCard = (cardOwnerName: string, nameToCheck: string) => {
  return cardOwnerName === nameToCheck;
};
export const getCardIndex = (key: string, cards: Card[]) => {
  return cards.findIndex((card) => card.key == key) || 0;
};

export const calculatePositions = (cardsOwner: Player, player: Player): SeatPositions => {
  //TODO: Make it in a more clever way :)

  if (cardsOwner.name === player.name) {
    return { avatarRotation: 'rotate-0', cardsRotation: 'col-start-2 row-start-3' };
  }

  switch (player.sitIndex) {
    case 1:
      if (cardsOwner.sitIndex == 2) {
        return { avatarRotation: 'rotate-270', cardsRotation: 'col-start-1 row-start-2 transform rotate-90' };
      }
      if (cardsOwner.sitIndex == 3) {
        return { avatarRotation: 'rotate-180', cardsRotation: 'col-start-2 row-start-1 transform rotate-180' };
      }
      if (cardsOwner.sitIndex == 4) {
        return { avatarRotation: 'rotate-90', cardsRotation: 'col-start-3 row-start-2 transform rotate-270' };
      }
    case 2:
      if (cardsOwner.sitIndex == 3) {
        return { avatarRotation: 'rotate-270', cardsRotation: 'col-start-1 row-start-2 transform rotate-90' };
      }
      if (cardsOwner.sitIndex == 4) {
        return { avatarRotation: 'rotate-180', cardsRotation: 'col-start-2 row-start-1 transform rotate-180' };
      }
      if (cardsOwner.sitIndex == 1) {
        return { avatarRotation: 'rotate-90', cardsRotation: 'col-start-3 row-start-2 transform rotate-270' };
      }
    case 3:
      if (cardsOwner.sitIndex == 4) {
        return { avatarRotation: 'rotate-270', cardsRotation: 'col-start-1 row-start-2 transform rotate-90' };
      }
      if (cardsOwner.sitIndex == 1) {
        return { avatarRotation: 'rotate-180', cardsRotation: 'col-start-2 row-start-1 transform rotate-180' };
      }
      if (cardsOwner.sitIndex == 2) {
        return { avatarRotation: 'rotate-90', cardsRotation: 'col-start-3 row-start-2 transform rotate-270' };
      }
    case 4:
      if (cardsOwner.sitIndex == 1) {
        return { avatarRotation: 'rotate-270', cardsRotation: 'col-start-1 row-start-2 transform rotate-90' };
      }
      if (cardsOwner.sitIndex == 2) {
        return { avatarRotation: 'rotate-180', cardsRotation: 'col-start-2 row-start-1 transform rotate-180' };
      }
      if (cardsOwner.sitIndex == 3) {
        return { avatarRotation: 'rotate-90', cardsRotation: 'col-start-3 row-start-2 transform rotate-270' };
      }
    default:
      break;
  }
};

export const usePlayerSeats = () => {
  return {
    isPlayerCard,
    getCardIndex,
    calculatePositions,
  };
};

interface SeatPositions {
  avatarRotation: string;
  cardsRotation: string;
}
