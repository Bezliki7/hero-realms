import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import type { OnClickCardPayload } from "../card/card.interface";

export type PlayerDecksProps = {
  player: Player;
  isResetDeckModalOpen: boolean;
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  setResetDeckModalOpen: (value: boolean) => void;
};

export type HandleClickCardParams = {
  id?: number;
  choiceActionId?: number;
  heroIdForAction?: number;
  checkedOptionalActions?: number[];
};
