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
  playerCards: Card[];
}

export interface Card {
  key: string;
  symbol: string;
  color: string;
  effect: string;
  playedBy: string;
}
export interface Message {
  message: string;
  playerName: string;
  gameKey: string;
}

export interface HubResponse<T> {
  config: object;
  data: T;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
