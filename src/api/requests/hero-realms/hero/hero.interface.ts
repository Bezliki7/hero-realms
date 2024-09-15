export type Hero = {
  id: number;
  name: string;
  image: string;
  fraction: string;
  price: number;
  isGuardian: boolean;
  protection?: number;
  placement?: HeroPlacement;
  battlefieldId?: number;
  actions: Action[];
};

export type ActionCondition =
  | "sacrifice"
  | "fraction"
  | "choice"
  | "for-every-defender"
  | "for-every-guardian"
  | "for-every-fraction";

export type HeroPlacement =
  | "active-deck"
  | "selection-deck"
  | "reset-deck"
  | "sacrificial-deck"
  | "trading-deck"
  | "trading-row"
  | "defenders-row";

export type Action = {
  id: number;
  conditions: ActionCondition[];
  isOptional: boolean;
  isUsed: boolean;
  damage: number;
  heal: number;
  gold: number;
  takeCard: number;
  resetCard: number;
  resetOpponentsCard: number;
  stanOpponentsHero: number;
  prepareHero: number;
  putToDeckResetedCard: number;
  putToDeckResetedDefender: number;
  putPurchasedCardIntoDec: number;
};

export type HireHeroDto = {
  heroId: number;
  playerId: number;
  putToSelectionDeck?: boolean;
};

export type UseHeroActionsDto = {
  heroId: number;
  playerId: number;
  choiceAction?: keyof ActionWithoutAdditionalInfo;
  heroIdForAction?: number;
};

export type ActionWithoutAdditionalInfo = Omit<
  Action,
  "id" | "playerId" | "heroId" | "conditions" | "isOptional"
>;
