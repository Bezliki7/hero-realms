import { createBrowserRouter } from "react-router-dom";

import StartScreen from "./start-screen/start-screen";
import AllHeroes from "./all-heroes/all-heroes";
import Settings from "./settings/settings";
import Battlefield from "./battlefield/battlefield";

export const router = createBrowserRouter([
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
