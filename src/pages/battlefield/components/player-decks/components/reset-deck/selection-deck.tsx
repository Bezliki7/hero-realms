import InvertedCard from "../../../inverted-card/inverted-card";
import styles from "./selection-deck.module.css";

type ResetDeckDeckProps = {
  resetDeckCount: number;
};

const ResetDeck = ({ resetDeckCount }: ResetDeckDeckProps) => {
  return (
    <InvertedCard>
      <div className={styles.label}>Карт в колоде сброса: {resetDeckCount}</div>
    </InvertedCard>
  );
};

export default ResetDeck;
