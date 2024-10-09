import { useSyncExternalStore } from "react";
import { MyData, store } from "../store/store.instance";

export const useStore = (key: keyof MyData) =>
  useSyncExternalStore(() => store.subscribe(key), store.getSnapshot);
