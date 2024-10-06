import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import InvertedCard from "../../../../../../components/inverted-card/inverted-card";
import styles from "./reset-deck.module.css";

type ResetDeckDeckProps = {
  heroes: Hero[];
};

const ResetDeck = ({ heroes }: ResetDeckDeckProps) => {
  return (
    <InvertedCard>
      <div className={styles.label}>Карт в колоде сброса: {heroes.length}</div>
    </InvertedCard>
  );
};

export default ResetDeck;
