import { useStore } from "@/pages/battlefield/hooks/use-store";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import InvertedCard from "../../../../../../components/inverted-card/inverted-card";
import styles from "./selection-deck.module.css";

const SelectionDeck = () => {
  const { heroes, ...store } = useStore();

  const selectionDeckCount =
    heroes.filter(
      (hero) =>
        hero.placement === HERO_PLACEMENT.SELECTION_DECK &&
        hero.playerId === store.player?.id
    ).length ?? 0;

  return (
    <InvertedCard>
      <div className={styles.label}>
        Карт в личной колоде: {selectionDeckCount}
      </div>
    </InvertedCard>
  );
};

export default SelectionDeck;
