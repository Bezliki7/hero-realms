import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import { Player } from "@/api/requests/hero-realms/player/player.interface";

export type StoreState = {
  players: Player[];
  heroes: Hero[];
};
