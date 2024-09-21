import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

export type CardProps = {
  hero: Hero;
  onClick?: (event: React.MouseEvent, payload: OnClickPayload) => void;
  isOpponentsCard?: boolean;
};

export type OnClickPayload = {
  choiceActionId?: number;
  checkedOptionalActions?: number[];
};
