import { useEffect, useMemo, useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import { useStore } from "./use-store";
import { WsService } from "../services/battlefield.service";

export const useBattlefieldState = (openChooseModal: () => void) => {
  const { player, setPlayer } = usePlayer();
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);

  const store = useStore();

  // const initStore = useMemo(() => {}, []);

  const wsService = useMemo(() => new WsService(), []);

  const opponentPlayer = battlefield.players.filter(
    ({ id }) => id !== player.id
  )?.[0];

  const handleBattlefieldUpdate = (battlefield: Battlefield) => {
    // setBattlefield(battlefield);

    store.init(battlefield, player.id);

    // const updatedPlayer = battlefield.players.find(
    //   ({ id }) => id === player.id
    // );

    // if (updatedPlayer) {
    //   setPlayer(updatedPlayer);
    // }
  };

  useEffect(() => {
    if (battlefield.id && !isInit) {
      wsService.init(battlefield.id);

      wsService.subscribeToUpdatedBattlefield(handleBattlefieldUpdate);
      wsService.subscribeToNeedResetCard(openChooseModal);

      if (battlefield.heroes.length) {
        setInit(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battlefield, isInit, setBattlefield]);

  return { wsService, battlefield, player, opponentPlayer };
};
