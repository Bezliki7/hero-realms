import { PLayer } from "@/api/requests/hero-realms/player/player.interface";
import ActiveDeck from "./components/active-deck/active-deck";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

type PlayerDecksProps = {
  player?: PLayer;
};

const PlayerDecks = ({ player }: PlayerDecksProps) => {
  if (!player) {
    return null;
  }

  const activeDeckHeroes =
    player.heroes?.filter(
      (hero) => hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    ) ?? [];

  return (
    <div>
      <ActiveDeck heroes={activeDeckHeroes} />
    </div>
  );
};

export default PlayerDecks;
