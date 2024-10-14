import type { Listeners, StoreState } from "./store.interface";

export class StoreInstance<Data extends Record<string, unknown>> {
  private listeners: Listeners = {} as Listeners;

  public state: Data = {} as Data;

  constructor(initialData: Data) {
    this.state = initialData;
  }

  public _subscribe(
    newListener: VoidFunction,
    keys?:
      | Extract<keyof Data, string>
      | Extract<keyof Data, string>[]
      | string
      | string[]
  ) {
    const keysList = typeof keys === "object" ? keys : [keys];
    const filteredKeys = keysList.filter((key) => key !== undefined);

    for (const key of filteredKeys) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(newListener);
    }

    const remove = (key: string) => {
      this.listeners[key] = this.listeners[key].filter(
        (listener) => listener !== newListener
      );
    };

    return () => {
      for (const key of filteredKeys) {
        remove(key);
      }
    };
  }

  public _getSnapshot = () => {
    return this.state;
  };

  public setData = (
    udaptedData: Partial<Data>,
    emitAllUpdatedData: boolean = true
  ) => {
    this.state = { ...this.state, ...udaptedData };

    if (emitAllUpdatedData) {
      const updatedDataKeys = Object.keys(udaptedData);

      updatedDataKeys.forEach((key) =>
        this.emitChange(key as Extract<keyof StoreState, string>)
      );
    }
  };

  public emitChange(key: Extract<keyof StoreState, string> | string) {
    if (this.listeners[key]) {
      console.log(key);
      this.listeners[key].forEach((listener) => listener());
    }
  }
}
