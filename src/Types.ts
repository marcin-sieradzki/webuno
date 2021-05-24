export interface Game {
  key: string;
  players: Player[];
  cardsPlayed: Card[];
  currentPlayerTurn: string;
}
export interface Player {
  key: string;
  name: string;
  isHost: Boolean;
  playerCards: Card[];
  turnIndex: number;
  sitIndex: number;
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

export interface CardPlayedResponse {
  gameKey: string;
  playerName: string;
  card: Card;
}
