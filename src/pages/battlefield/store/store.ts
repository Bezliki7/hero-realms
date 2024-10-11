import type { Player } from "@/api/requests/hero-realms/player/player.interface";
import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import { StoreInstance } from "./store.instance";

import type { StoreState } from "./store.interface";

class Store {
  public players: Player[] = [];
  public heroes: Hero[] = [];

  constructor(public readonly storeInstance: StoreInstance<StoreState>) {
    this.players = storeInstance.state.players;
    this.heroes = storeInstance.state.heroes;
  }

  public init = (players: Player[], heroes: Hero[]) => {
    this.storeInstance.setData({
      players,
      heroes,
    });
  };
}

const initialData: StoreState = {
  players: [],
  heroes: [],
};

const storeInstance = new StoreInstance(initialData);

export default new Store(storeInstance);
