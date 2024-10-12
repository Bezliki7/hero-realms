import { useSyncExternalStore } from "react";

import type { StoreState } from "../store/store.interface";
import store from "../store/store";

export const useStore = (key?: keyof StoreState | (keyof StoreState)[]) => {
  const { storeInstance } = store;

  const storeState = useSyncExternalStore(
    (listener) => storeInstance._subscribe(listener, key),
    storeInstance._getSnapshot
  );

  return { ...storeState, ...{ init: store.init } };
};
