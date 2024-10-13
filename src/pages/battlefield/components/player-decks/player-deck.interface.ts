import { OnClickCardPayload } from "@/components/hero-card/card.interface";

export type PlayerDecksProps = {
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
};

export type HandleClickCardParams = {
  id?: number;
  choiceActionId?: number;
  heroIdForAction?: number;
  checkedOptionalActions?: number[];
};
