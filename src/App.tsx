import AllHeroes from "./pages/all-heroes/all-heroes";
import Battlefield from "./pages/battlefield/battlefield";
import Settings from "./pages/settings/settings";
import StartScreen from "./pages/start-screen/start-screen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
