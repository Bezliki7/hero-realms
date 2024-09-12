import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  BatllefieldContext,
  BtlfdWithCurrPlayerId,
} from "./contexts/battlefield";
import AllHeroes from "./pages/all-heroes/all-heroes";
import Battlefield from "./pages/battlefield/battlefield";
import Settings from "./pages/settings/settings";
import StartScreen from "./pages/start-screen/start-screen";
import apiClient from "./api/api-client";

import type { PlayerInfo } from "./pages/settings/settings.interface";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/all-heroes",
    element: <AllHeroes />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/battlefield",
    element: <Battlefield />,
  },
]);

const App = () => {
  const [battlefield, setBattlefield] = useState<BtlfdWithCurrPlayerId>();

  useEffect(() => {
    const fetch = async () => {
      const playerInfo = localStorage.getItem("player-info");

      if (playerInfo) {
        const { battlefieldId, playerId } = JSON.parse(
          playerInfo
        ) as PlayerInfo;

        const { data } = await apiClient.battlefield.getBattlefield(
          battlefieldId
        );

        setBattlefield({
          ...data,
          currentPlayerId: playerId,
        });
      }
    };

    fetch();
  }, []);

  const handleChangeBattlefiel = (payload: BtlfdWithCurrPlayerId) => {
    setBattlefield({ ...battlefield, ...payload });
  };

  return (
    <BatllefieldContext.Provider
      value={{
        battlefield,
        setBattlefield: handleChangeBattlefiel,
      }}
    >
      <RouterProvider router={router} />
    </BatllefieldContext.Provider>
  );
};

export default App;
