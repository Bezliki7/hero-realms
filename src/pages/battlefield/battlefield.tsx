import { useEffect, useRef } from "react";

import Loader from "@/components/loader/loader";
import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import TradingRow from "./components/trading-row/trading-row";
import PlayerDecks from "./components/player-decks/player-decks";
import { useStore } from "./hooks/use-store";
import Footer from "./components/footer/footer";
import PlayersInfo from "./components/players-info/players-info";
import Modals from "./components/modals/modals";

const Battlefield = () => {
  const clickedHeroId = useRef(0);

  const store = useStore("heroes");
  const { player } = usePlayer();
  const { battlefield } = useBattlefield();

  useEffect(() => {
    store.init(battlefield, player.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!store.heroes.length) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden">
      <PlayersInfo />

      <TradingRow />

      <PlayerDecks clickedHeroId={clickedHeroId} />

      <Footer />

      <Modals clickedHeroId={clickedHeroId} />
    </div>
  );
};

export default Battlefield;
