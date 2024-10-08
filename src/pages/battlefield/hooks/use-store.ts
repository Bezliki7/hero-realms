import { useSyncExternalStore } from "react";
import { Data, store } from "../store/store.instance";

export const useStore = (key: keyof Data) =>
  useSyncExternalStore(() => store.subscribe(key), store.getSnapshot);
