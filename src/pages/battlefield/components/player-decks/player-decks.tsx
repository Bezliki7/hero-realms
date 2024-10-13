import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import ActiveDeck from "./components/active-deck/active-deck";
import SelectionDeck from "./components/selection-deck/selection-deck";
import ResetDeck from "./components/reset-deck/reset-deck";
import styles from "./player-decks.module.css";

import type { PlayerDecksProps } from "./player-deck.interface";
import { useStore } from "../../hooks/use-store";

const PlayerDecks = ({ clickedHeroId, onClickCard }: PlayerDecksProps) => {
  const { player } = useStore();

  const selectionDeckCount =
    player?.heroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.SELECTION_DECK
    ).length ?? 0;

  const resetDeck =
    player?.heroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.RESET_DECK
    ) ?? [];

  return (
    <div className={styles.container}>
      <ActiveDeck clickedHeroId={clickedHeroId} onClickCard={onClickCard} />
      <SelectionDeck selectionDeckCount={selectionDeckCount} />
      <ResetDeck heroes={resetDeck} />
    </div>
  );
};

export default PlayerDecks;
