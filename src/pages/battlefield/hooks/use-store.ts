import { useSyncExternalStore } from "react";

import { store } from "../store/store";

import type { UseStoreKey } from "../store/store.interface";

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
