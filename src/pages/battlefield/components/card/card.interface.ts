import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

export type CardProps = {
  hero: Hero;
  onClick?: (payload: OnClickCardPayload) => void;
  isOpponentsCard?: boolean;
};

export type OnClickCardPayload = {
  id: number;
  choiceActionId?: number;
  checkedOptionalActions?: number[];
  heroIdForAction?: number;
  needHeroForAction?: boolean;
};
