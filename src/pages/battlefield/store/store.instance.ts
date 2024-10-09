// type Listeners = { [type: string]: Map<string, VoidFunction> };
type Listeners = Record<string, VoidFunction[]>;

export type MyData = {
  players: string[];
  heroes: [];
};

const myData: MyData = { players: [], heroes: [] };

const listeners: Listeners = {};

const subscribe = (key: string | number, listener: VoidFunction) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);
  console.log("newSub", listeners);
  return () => {
    listeners[key] = listeners[key].filter((l) => l !== listener);
  };
};

const emitChange = (type: keyof MyData | string) => {
  if (!listeners[type]) {
    throw new Error("none exist listener type");
  }
  console.log(`Emitting change for: ${type}`);
  for (const l of listeners[type]) {
    l();
  }
};

export const createStore = <Data extends Record<string, unknown>>(
  data: Data
) => {
  return {
    subscribe: (key: keyof Data) =>
      subscribe(key as string, () => {
        console.log("listen", key);
      }),

    getSnapshot: () => {
      return data;
    },
    setData: (udaptedData: Partial<Data>) => {
      const newData = { ...data, ...udaptedData };
      data = newData;
      Object.keys(udaptedData).forEach((key) => emitChange(key));
    },
  };
};

export const store = createStore<MyData>(myData);

export const fetchSmth = () => {
  console.log("11");
  const newplayers = ["player1", "player2"];

  store.setData({ players: newplayers });
};
