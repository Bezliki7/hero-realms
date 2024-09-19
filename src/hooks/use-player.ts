import { useContext } from "react";

import { PlayerContext } from "@/contexts/player/player";

export const usePlayer = () => useContext(PlayerContext);
