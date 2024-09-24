import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import ActiveDeck from "./components/active-deck/active-deck";
import SelectionDeck from "./components/selection-deck/selection-deck";
import ResetDeck from "./components/reset-deck/reset-deck";

import type { PlayerDecksProps } from "./player-deck.interface";

const PlayerDecks = ({
  player,
  clickedHeroId,
  onClickCard,
}: PlayerDecksProps) => {
  const activeDeck =
    player.heroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    ) ?? [];

  const selectionDeckCount = player.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SELECTION_DECK
  ).length;

  const resetDeck = player.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.RESET_DECK
  );

  return (
    <div>
      <div className="flex items-center">
        <ActiveDeck
          heroes={activeDeck}
          clickedHeroId={clickedHeroId}
          onClickCard={onClickCard}
        />
        <SelectionDeck selectionDeckCount={selectionDeckCount} />
        <ResetDeck heroes={resetDeck} />
      </div>
    </div>
  );
};

export default PlayerDecks;
