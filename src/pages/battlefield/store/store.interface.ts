import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import type { store } from "./store";

export type StoreState = {
  players: Player[];
  heroes: Hero[];
  currentPlayerId: number;
  isChooseModalOpen: boolean;
  isDefendersModalOpen: boolean;
  isSupportsModalOpen: boolean;
  isLoading: boolean;
};

export type Listeners = Record<string, VoidFunction[]>;

type StoreItems =
  | "init"
  | "player"
  | "playerActiveDeck"
  | "useHeroActions"
  | "wsService"
  | "opponentPlayer"
  | "playerHeroes"
  | "endPlayerMove";

export type Store = Pick<typeof store, StoreItems> & {
  setData: typeof store.storeInstance.setData;
} & StoreState;

export type UseStoreKey = {
  (key?: keyof StoreState): Store;
  (key?: (keyof StoreState)[]): Store;
  (key?: string | string[]): Store;
};
