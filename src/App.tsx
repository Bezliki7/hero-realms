import { useEffect, useState } from "react";

import apiClient from "./api/api-client";
import { Routes } from "./pages";
import Settings from "./pages/settings/settings";
import Providers from "./contexts";
import { PLAYER_INFO_KEY } from "./pages/settings/settings.constant";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/loader/loader";

import type { PlayerInfo } from "./pages/settings/settings.interface";
import type { Battlefield } from "./api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "./api/requests/hero-realms/player/player.interface";

const App = () => {
  const [battlefield, setBattlefield] = useState<Battlefield>();
  const [player, setPlayer] = useState<Player>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const playerInfo = localStorage.getItem(PLAYER_INFO_KEY);

      if (playerInfo) {
        const { battlefieldId, playerId } = JSON.parse(
          playerInfo
        ) as PlayerInfo;

        const battlefield = await apiClient.battlefield.getBattlefield(
          battlefieldId
        );
        const player = await apiClient.player.getPlayer(playerId);

        setBattlefield(battlefield.data);
        setPlayer(player.data);
      }
      setLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!(battlefield && player)) {
    return <Settings />;
  }

  return (
    <Providers battlefield={battlefield} player={player}>
      <Routes />
      <Toaster />
    </Providers>
  );
};

export default App;
