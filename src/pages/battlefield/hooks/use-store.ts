import { useSyncExternalStore } from "react";

import store from "../store/store";

import type { StoreState } from "../store/store.interface";

type Store = Pick<
  typeof store,
  | "init"
  | "player"
  | "playerActiveDeck"
  | "useHeroActions"
  | "wsService"
  | "opponentPlayer"
  | "playerHeroes"
  | "endPlayerMove"
> & { setData: typeof store.storeInstance.setData } & StoreState;

type UseStoreKey = {
  (key?: keyof StoreState): Store;
  (key?: (keyof StoreState)[]): Store;
  (key?: string | string[]): Store;
};

export const useStore: UseStoreKey = (key) => {
  const { storeInstance, ...res } = store;

  const storeState = useSyncExternalStore(
    (listener) => storeInstance._subscribe(listener, key),
    storeInstance._getSnapshot
  );

  return {
    ...storeState,
    ...res,
    endPlayerMove: store.endPlayerMove,
    setData: storeInstance.setData,
    playerHeroes: store.playerHeroes,
    player: store.player,
    opponentPlayer: store.opponentPlayer,
    playerActiveDeck: store.playerActiveDeck,
  } as const;
};
