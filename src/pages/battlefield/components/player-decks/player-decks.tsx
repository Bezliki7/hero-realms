import ActiveDeck from "./components/active-deck/active-deck";
import SelectionDeck from "./components/selection-deck/selection-deck";
import ResetDeck from "./components/reset-deck/reset-deck";
import styles from "./player-decks.module.css";

import type { PlayerDecksProps } from "./player-deck.interface";

const PlayerDecks = ({ clickedHeroId }: PlayerDecksProps) => {
  return (
    <div className={styles.container}>
      <ActiveDeck clickedHeroId={clickedHeroId} />
      <SelectionDeck />
      <ResetDeck />
    </div>
  );
};

export default PlayerDecks;
