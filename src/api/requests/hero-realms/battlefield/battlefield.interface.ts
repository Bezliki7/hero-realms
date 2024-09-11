import { Hero } from "../hero/hero.interface";
import { PLayer } from "../player/player.interface";

export type CreateBattlefieldDto = {
  name: string;
};

export type Battlefield = {
  id: number;
  name: string;
  round: number;
  heroes: Hero[];
  players: PLayer[];
};
