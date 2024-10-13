import { useSyncExternalStore } from "react";

import type { StoreState } from "../store/store.interface";
import store from "../store/store";

type Store = Pick<
  typeof store,
  "init" | "player" | "playerActiveDeck" | "useHeroActions" | "wsService"
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
    setData: storeInstance.setData,
    player: store.player,
    playerActiveDeck: store.playerActiveDeck,
  } as const;
};
