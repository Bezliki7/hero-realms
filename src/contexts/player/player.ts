import { createContext } from "react";

import type { Player } from "@/api/requests/hero-realms/player/player.interface";

export type PlayerContextProps = {
  player: Player;
  setPlayer: (Player: Partial<Player>) => void;
};

export const PlayerContext = createContext({} as PlayerContextProps);
