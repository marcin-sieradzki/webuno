export interface Game {
  key: string;
  players: Player[];
  cardsPlayed: Card[];
  currentPlayerTrun: string;
}
export interface Player {
  key: string;
  name: string;
  isHost: Boolean;
  cards: Card[];
}

export interface Card {
  key: string;
  symbol: string;
  color: string;
  effect: string;
}
