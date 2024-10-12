import type { Player } from "@/api/requests/hero-realms/player/player.interface";
import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import { StoreInstance } from "./store.instance";
import { WsService } from "../services/battlefield.service";

import type { StoreState } from "./store.interface";

class Store {
  public players: Player[] = [];
  public heroes: Hero[] = [];

  constructor(
    public readonly storeInstance: StoreInstance<StoreState>,
    public readonly wsService: WsService
  ) {
    this.players = storeInstance.state.players;
    this.heroes = storeInstance.state.heroes;
  }

  public init = (battlefield: Battlefield, currentPlayerId: number) => {
    this.storeInstance.setData({
      players: battlefield.players,
      heroes: battlefield.heroes,
      currentPlayerId,
    });

    this.wsService.connect(currentPlayerId);

    this.wsService.subscribeToUpdatedBattlefield((battlefield) => {
      this.storeInstance.setData({
        players: battlefield.players,
        heroes: battlefield.heroes,
      });
    });
  };
}

const initialData: StoreState = {
  players: [],
  heroes: [],
  currentPlayerId: 0,
};

const storeInstance = new StoreInstance(initialData);
const wsService = new WsService();

export default new Store(storeInstance, wsService);
