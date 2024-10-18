import isEqual from "lodash.isequal";

import apiClient from "@/api/api-client";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import { OnClickCardPayload } from "@/components/hero-card/card.interface";
import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import { StoreInstance } from "./store.instance";
import { WsService } from "../services/battlefield.service";

import type { StoreState } from "./store.interface";

class Store {
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
    this.wsService.subscribeToNeedResetCard(() =>
      this.storeInstance.setData({ isChooseModalOpen: true })
    );
  };

  public onBattledieldUpdated = (battlefield: Battlefield) => {
    for (const hero of battlefield.heroes) {
      const currHeroIndex = this.state.heroes.findIndex(
        ({ id }) => id === hero.id
      );
      const currHero = this.state.heroes[currHeroIndex];

      const isHeroUpdated = this.isHeroUpdated(currHero, hero);

      if (currHeroIndex !== -1 && isHeroUpdated) {
        this.state.heroes.splice(currHeroIndex, 1, hero);
        this.storeInstance.setData(
          { ...this.state, heroes: this.storeInstance.state.heroes },
          false
        );
        const key = `hero-${hero.id}`;
        this.storeInstance.emitChange(key);
      }
    }

    this.storeInstance.setData(
      {
        ...this.state,
        players: battlefield.players,
      },
      false
    );
    this.storeInstance.emitChange("players");
    this.storeInstance.emitChange("player");
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

  public isHeroUpdated(hero: Hero, newHero: Hero) {
    const { actions, ...restHeroOpt } = hero;
    const { actions: newHeroActions, ...restNewHeroOpt } = newHero;

    const sortedActions = actions.sort((a, b) => a.id - b.id);
    const sortedNewHeroActions = newHeroActions.sort((a, b) => a.id - b.id);

    if (
      isEqual(restHeroOpt, restNewHeroOpt) &&
      isEqual(sortedActions, sortedNewHeroActions)
    ) {
      return false;
    }
    return true;
  }
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

export default new Store(storeInstance, wsService);
