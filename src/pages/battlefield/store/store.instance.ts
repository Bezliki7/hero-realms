import type { Listeners, StoreState } from "./store.interface";

export class StoreInstance<Data extends Record<string, unknown>> {
  private listeners: Listeners = {} as Listeners;

  public state: Data = {} as Data;

  constructor(initialData: Data) {
    this.state = initialData;
  }

  public _subscribe(
    newListener: VoidFunction,
    key?: Extract<keyof Data, string>
  ) {
    if (key) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(newListener);
    }

    return () => {
      if (key) {
        this.listeners[key] = this.listeners[key].filter(
          (listener) => listener !== newListener
        );
      }
    };
  }

  public _getSnapshot = () => {
    return this.state;
  };

  public setData(
    udaptedData: Partial<Data>,
    emitAllUpdatedData: boolean = true
  ) {
    this.state = { ...this.state, ...udaptedData };

    if (emitAllUpdatedData) {
      const updatedDataKeys = Object.keys(udaptedData);

      updatedDataKeys.forEach((key) =>
        this.emitChange(key as Extract<keyof StoreState, string>)
      );
    }
  }

  public emitChange(key: Extract<keyof StoreState, string>) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((listener) => listener());
    }
  }
}
