import type { Player } from "@/api/requests/hero-realms/player/player.interface";
import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import { StoreInstance } from "./store.instance";

import type { StoreState } from "./store.interface";

class Store extends StoreInstance<StoreState> {
  public players: Player[] = [];
  public heroes: Hero[] = [];

  constructor(initialData: StoreState) {
    super(initialData);
  }

  // public async init() {
  //   this.players.push({
  //     battlefieldId: 1,
  //     currentDamageCount: 0,
  //     currentGoldCount: 0,
  //     currentTurnPlayer: true,
  //     health: 50,
  //     heroes: [],
  //     id: 1,
  //     name: "ss",
  //   });
  //   this.emitChange("players");
  // }
}

const initialData: StoreState = {
  heroes: [],
  players: [],
};

export default new Store(initialData);
