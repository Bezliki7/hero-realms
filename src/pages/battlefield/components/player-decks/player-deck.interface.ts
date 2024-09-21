import type { Player } from "@/api/requests/hero-realms/player/player.interface";

export type PlayerDecksProps = {
  player: Player;
};

export type HandleClickCardParams = {
  id?: number;
  choiceActionId?: number;
  heroIdForAction?: number;
  checkedOptionalActions?: number[];
};
