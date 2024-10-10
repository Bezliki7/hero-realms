import { useSyncExternalStore } from "react";

import store from "../store/store";

import type { StoreState } from "../store/store.interface";
import storeInstance from "../store/store.instance";

export const useStore = (key: keyof StoreState) => {
  const storeState = useSyncExternalStore(
    (listener) => storeInstance._subscribe(listener, key),
    storeInstance._getSnapshot
  );

  return { ...storeState, ...{ init: () => storeInstance.init() } };
};
