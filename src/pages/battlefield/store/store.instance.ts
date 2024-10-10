import type { Listeners, StoreState } from "./store.interface";

let data: StoreState = {
  heroes: [],
  players: [],
};
const listeners: Listeners = {} as Listeners;
class StoreInstance<Data extends Record<string, unknown>> {
  public data: StoreState = {
    heroes: [],
    players: [],
  } as StoreState;

  constructor(initialData: StoreState) {
    console.log("initial", initialData);
    this.data = initialData;
  }

  public _subscribe(
    newListener: VoidFunction,
    key: Extract<keyof Data, string>
  ) {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(newListener);
    console.log("listeners", listeners);
    return () => {
      listeners[key] = listeners[key].filter(
        (listener) => listener !== newListener
      );
    };
  }

  public _getSnapshot = () => {
    return this.data;
  };

  public setData(udaptedData: Partial<Data>) {
    this.data = { ...data, ...udaptedData };

    const updatedDataKeys = Object.keys(udaptedData);

    updatedDataKeys.forEach((key) =>
      this.emitChange(key as Extract<keyof StoreState, string>)
    );
  }

  public emitChange(key: Extract<keyof StoreState, string>) {
    if (!listeners[key]) {
      throw new Error("none exist listener key");
    }

    listeners[key].forEach((listener) => listener());
  }

  public init = () => {
    const players = [
      {
        battlefieldId: 1,
        currentDamageCount: 0,
        currentGoldCount: 0,
        currentTurnPlayer: true,
        health: 50,
        heroes: [],
        id: 1,
        name: "ss",
      },
    ];
    this.data = { ...this.data, players };

    this.emitChange("players");
  };
}

const initialData: StoreState = {
  heroes: [],
  players: [],
};

export default new StoreInstance(data);
