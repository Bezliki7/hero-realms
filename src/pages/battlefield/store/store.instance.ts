type Listeners = { [type: string]: Map<string, VoidFunction> };
type ListenersTest = { [type: string]: VoidFunction };

const listeners: Listeners = {};
const myData: Data = { players: [], heroes: [] };

// const subscribe = (type: string, key: string, listener: () => void) => {
//   if (!listeners[type]) {
//     listeners[type] = new Map();
//   }

//   listeners[type].set(key, listener);

//   const remove = () => {
//     listeners[type].delete(key);
//   };
//   return remove;
// };

// const emitChange = (type: string) => {
//   if (!listeners[type]) {
//     throw new Error("none exist listener type");
//   }

//   const istenersArr = Object.values(listeners[type]);
//   istenersArr.map((listener) => listener());
// };

// const emitChangeAll = () => {
//   return Object.values(listeners).map((map) => {
//     for (const s of map.values()) {
//       s();
//     }
//   });
// };

let defListeners: ListenersTest = {};

const defSub = (key: string | number, listener: VoidFunction) => {
  defListeners[key] = listener;
  return () => {
    defListeners = {};
  };
};

type TestPayload = { [key: string]: string[] };

export const createStore = <Data>(data: Data) => {
  return {
    subscribe: (key: keyof Data) =>
      defSub(key as string, () => console.log("listen key")),
    getSnapshot: () => data,
    fetchSmth,
  };
};

export const fetchSmth = () => {
  myData.players = ["player1", "player2"];
};

export type Data = {
  players: string[];
  heroes: [];
};

export const store = createStore<Data>(myData);
