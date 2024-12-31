import { Hero } from "../hero/hero.interface";

import { Player } from "../player/player.interface";

export type CreateBattlefieldDto = {
  name: string;
  playerId: number;
};

export type UpdateBattlefieldDto = {
  name?: string;
  round?: number;
  playersIds?: number[];
  heroIds?: number[];
};

export type Battlefield = {
  id: number;
  name: string;
  round: number;
  heroes: Hero[];
  players: Player[];
};
