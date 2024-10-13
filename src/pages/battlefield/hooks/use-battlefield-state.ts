import { useEffect, useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import { useStore } from "./use-store";

//TODO
export const useBattlefieldState = () => {
  const { player, setPlayer } = usePlayer();
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);

  const opponentPlayer = battlefield.players.filter(
    ({ id }) => id !== player.id
  )?.[0];

  return { opponentPlayer };
};
