import { ActionCondition } from "./hero.interface";

export const ACTION_CONDITION = {
  SACRIFICE: "sacrifice",
  FRACTION: "fraction",
  CHOICE: "choice",
  FOR_EVERY_DEFENDER: "for-every-defender",
  FOR_EVERY_GURDIAN: "for-every-guardian",
  FOR_EVERY_FRACTION: "for-every-fraction",
} as const;

export const CONDITIONS_WITH_FOR_EVERY = [
  ACTION_CONDITION.FOR_EVERY_DEFENDER,
  ACTION_CONDITION.FOR_EVERY_FRACTION,
  ACTION_CONDITION.FOR_EVERY_GURDIAN,
] as ActionCondition[];

export const HERO_PLACEMENT = {
  ACTIVE_DECK: "active-deck",
  SELECTION_DECK: "selection-deck",
  RESET_DECK: "reset-deck",
  SACRIFICIAL_DECK: "sacrificial-deck",
  TRADING_DECK: "trading-deck",
  TRADING_ROW: "trading-row",
} as const;
