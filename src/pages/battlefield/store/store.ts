import isEqual from "lodash.isequal";

import apiClient from "@/api/api-client";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import type { OnClickCardPayload } from "@/components/hero-card/card.interface";
import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import { StoreInstance } from "./store.instance";
import { WsService } from "../services/battlefield.service";

import type { StoreState } from "./store.interface";

class BaseStore {
  public get state() {
    return this.storeInstance.state;
  }

  constructor(
    public readonly storeInstance: StoreInstance<StoreState>,
    public readonly wsService: WsService
  ) {}

  public get player() {
    return this.state.players.find(
      (player) => player.id === this.state.currentPlayerId
    );
  }

  public get opponentPlayer() {
    return this.state.players.filter(({ id }) => id !== this.player?.id)?.[0];
  }

  public get playerHeroes() {
    return this.state.heroes.filter(
      (hero) => hero.playerId === this.player?.id
    );
  }

  public get playerActiveDeck() {
    return this.state.heroes.filter(
      (hero) =>
        hero.playerId === this.state.currentPlayerId &&
        hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    );
  }

  public init = (battlefield: Battlefield, currentPlayerId: number) => {
    this.storeInstance.setData({
      players: battlefield.players,
      heroes: battlefield.heroes,
      currentPlayerId,
    });

    this.wsService.connect(currentPlayerId);

    this.wsService.subscribeToUpdatedBattlefield(this.onBattledieldUpdated);
    this.wsService.subscribeToUpdatedPlayers(this.onPlayersUpdated);
    this.wsService.subscribeToUpdatedHero(this.onHeroUpdated);
    this.wsService.subscribeToNeedResetCard(() =>
      this.storeInstance.setData({ isChooseModalOpen: true })
    );
  };

  public onBattledieldUpdated = (battlefield: Battlefield) => {
    for (const hero of battlefield.heroes) {
      const currHeroIndex = this.state.heroes.findIndex(
        ({ id }) => id === hero.id
      );

      if (currHeroIndex !== -1) {
        this.state.heroes.splice(currHeroIndex, 1, hero);
        this.storeInstance.setData(
          {
            heroes: this.storeInstance.state.heroes,
          },
          false
        );
        const key = `hero-${hero.id}`;
        this.storeInstance.emitChange(key);
      }
    }
  };

  public onPlayersUpdated = (players: Player[]) => {
    const normalizedPlayers = players.map((player) => ({
      ...this.state.players.find(({ id }) => id === player.id),
      ...player,
    }));

    const changed = !isEqual(normalizedPlayers, this.state.players);

    if (changed) {
      this.storeInstance.setData({ players: normalizedPlayers });
    }
  };

  public onHeroUpdated = (hero: Hero) => {
    console.log(hero);
    const heroIndex = this.state.heroes.findIndex(({ id }) => id === hero.id);
    const newHeroes = [...this.state.heroes];
    newHeroes[heroIndex] = hero;

    this.storeInstance.setData({ heroes: newHeroes }, false);

    const key = `hero-${hero.id}`;
    this.storeInstance.emitChange(key);
  };

  public useHeroActions = async (
    payload: OnClickCardPayload,
    onUseAction?: VoidFunction
  ) => {
    if (!this.player || !this.player?.currentTurnPlayer) {
      return;
    }

    if (
      !payload.needHeroForAction &&
      (!payload.checkedOptionalActions?.length || payload.heroIdForAction)
    ) {
      await apiClient.hero.useHeroActions({
        heroId: payload.id,
        playerId: this.player.id,
        choiceActionId: payload.choiceActionId,
        heroIdForAction: payload.heroIdForAction,
      });

      onUseAction?.();
      this.storeInstance.setData({ isChooseModalOpen: false });
    } else if (
      payload.needHeroForAction ||
      payload.checkedOptionalActions?.length
    ) {
      this.storeInstance.setData({ isChooseModalOpen: true });
    }
  };

  public endPlayerMove = async () => {
    if (this.player?.currentTurnPlayer) {
      await apiClient.player.endPlayerMove(this.player.id);
      this.storeInstance.emitChange("heroes");
    }
  };
}

const initialData: StoreState = {
  players: [],
  heroes: [],
  currentPlayerId: 0,
  isChooseModalOpen: false,
  isDefendersModalOpen: false,
  isSupportsModalOpen: false,
};

const storeInstance = new StoreInstance(initialData);
const wsService = new WsService();

export const store = new BaseStore(storeInstance, wsService);
