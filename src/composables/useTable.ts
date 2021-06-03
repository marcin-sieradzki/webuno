import { Player } from "@/Types";
import { useGame } from "@/composables/useGame";

export const useTable = () => {
  const getCardsPosition = (cardsOwner: Player) => {
    const { player } = useGame();

    // if (cardsOwner.name === player.value.name) {
    //   return "col-start-2 row-start-3";
    // }

    switch (cardsOwner.sitIndex) {
      case 1:
        return "col-start-2 row-start-3";
      case 2:
        return "col-start-1 row-start-2 transform rotate-90";
      case 3:
        return "col-start-2 row-start-1 transform rotate-180";
      case 4:
        return "col-start-3 row-start-2 transform rotate-270";
      default:
        break;
    }
  };
  return {
    getCardsPosition,
  };
};
