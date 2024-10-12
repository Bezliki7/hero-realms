import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

export type StoreState = {
  players: Player[];
  heroes: Hero[];
  currentPlayerId: number;
};

export type Listeners = Record<string, VoidFunction[]>;
