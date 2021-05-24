import { Player } from "@/Types";
export const useTable = () => {
  const getCardsPosition = (player: Player) => {
    if (player.isHost) {
      return "bottom-0 right-0 transform translate-x-[-25%]";
    }
    switch (player.sitIndex) {
      case 2:
        return "right-0 top-0 transform origin-right rotate-270 translate-x-[-11%] translate-y-[-50%]";
      case 3:
        return "top-0 right-0 transform rotate-180 transform translate-x-[-25%]";
      case 4:
        return "left-0 top-0 transform origin-left  rotate-90 translate-x-[11%] translate-y-[-50%]";
      default:
        break;
    }
  };
  return {
    getCardsPosition,
  };
};
