import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "@/components/loader/loader";

import StartScreen from "./start-screen/start-screen";
import Battlefield from "./battlefield/battlefield";

const AllHeroes = lazy(() => import("./all-heroes/all-heroes"));
const Settings = lazy(() => import("./settings/settings"));

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

export const Routes = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);
