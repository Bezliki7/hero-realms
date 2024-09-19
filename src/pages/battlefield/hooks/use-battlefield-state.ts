import { useEffect, useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import battlefieldService from "../services/battlefield.service";

export const useBattlefieldState = () => {
  const { player, setPlayer } = usePlayer();
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);

  const handleBattlefieldUpdate = (battlefield: Battlefield) => {
    setBattlefield(battlefield);

    const updatedPlayer = battlefield.players.find(
      ({ id }) => id === player.id
    );

    if (updatedPlayer) {
      setPlayer(updatedPlayer);
    }
  };

  useEffect(() => {
    if (battlefield.id && !isInit) {
      battlefieldService.init(battlefield.id);
      battlefieldService.subscribeToUpdatedBattlefield(handleBattlefieldUpdate);
      if (battlefield.heroes.length) {
        setInit(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battlefield, isInit, setBattlefield]);

  const opponentPlayer = battlefield.players.filter(
    ({ id }) => id !== player.id
  )?.[0];

  return { battlefield, player, opponentPlayer };
};
