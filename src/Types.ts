import { Ref } from "vue";

export interface Game {
  key: string;
  players: Player[];
  cardsPlayed: Card[];
  currentPlayerTurn: string;
  deck: Card[];
  winnerId: string;
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
export type CardType = "hand" | "stack" | "played";

export enum CardTypeEnum {
  hand = "hand",
  stack = "stack",
  played = "played",
}

export interface PromiseResponse {
  data: any;
  loading: Ref<boolean>;
  error: any;
}
