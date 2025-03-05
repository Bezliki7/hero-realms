import { useStore } from "@/pages/battlefield/hooks/use-store";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import InvertedCard from "../../../../../../components/inverted-card/inverted-card";
import styles from "./reset-deck.module.css";

const ResetDeck = () => {
  const { heroes, ...store } = useStore();

  const selectionDeckCount =
    heroes.filter(
      (hero) =>
        hero.placement === HERO_PLACEMENT.RESET_DECK &&
        hero.playerId === store.player?.id
    ).length ?? 0;

  return (
    <InvertedCard>
      <div className={styles.label}>
        Карт в колоде сброса: {selectionDeckCount}
      </div>
    </InvertedCard>
  );
};

export default ResetDeck;
