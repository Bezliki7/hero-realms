import { useEffect, useState } from "react";

import apiClient from "./api/api-client";
import { Routes } from "./pages";
import Settings from "./pages/settings/settings";
import Providers from "./contexts";
import { PLAYER_INFO_KEY } from "./pages/settings/settings.constant";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/loader/loader";
import {
  DEFAULT_BATTLEFIELD_VALUES,
  DEFAULT_PLAYER_VALUES,
} from "./app.constant";

import type { PlayerInfo } from "./pages/settings/settings.interface";
import type { Battlefield } from "./api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "./api/requests/hero-realms/player/player.interface";

export const App = () => {
  const [battlefield, setBattlefield] = useState<Battlefield>(
    DEFAULT_BATTLEFIELD_VALUES
  );
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER_VALUES);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const playerInfo = localStorage.getItem(PLAYER_INFO_KEY);

      try {
        if (playerInfo) {
          const { battlefieldId, playerId } = JSON.parse(
            playerInfo
          ) as PlayerInfo;

          const player = await apiClient.player.getPlayer(playerId);
          setPlayer(player.data);

          const battlefield = await apiClient.battlefield.getBattlefield(
            battlefieldId
          );
          setBattlefield(battlefield.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Providers battlefield={battlefield} player={player}>
      {!battlefield || !player ? (
        <Settings />
      ) : (
        <>
          <Routes />
          <Toaster />
        </>
      )}
    </Providers>
  );
};
