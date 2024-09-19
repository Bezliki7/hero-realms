import { useMemo, useState } from "react";

import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import { PlayerContext, PlayerContextProps } from "./player";

type PlayerPoviderProps = {
  player: Player;
  children: React.ReactNode;
};

const PlayerPovider = ({ player, children }: PlayerPoviderProps) => {
  const [state, setState] = useState(player);

  const handleChangePlayer = (payload: Partial<Player>) => {
    setState({ ...state, ...payload });
  };

  const value: PlayerContextProps = useMemo(
    () => ({
      player: state,
      setPlayer: handleChangePlayer,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerPovider;
