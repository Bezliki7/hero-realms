import type { Hero } from "../hero/hero.interface";

export type CreatePlayerDto = {
  name: string;
  battlefieldId: number;
};

export type UpdatePlayerDto = {
  id: number;
  name?: string;
  battlefieldId?: number;
  image?: string;
  health?: number;
  turnOrder?: number;
  currentTurnPlayer?: boolean;
};

export type PLayer = {
  id: number;
  battlefieldId: number;
  name: string;
  health: number;
  currentTurnPlayer: boolean;
  heroes: Hero[];
};
