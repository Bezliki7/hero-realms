import InvertedCard from "../../../../../../components/inverted-card/inverted-card";
import styles from "./selection-deck.module.css";

type SelectionDeckDeckProps = {
  selectionDeckCount: number;
};

const SelectionDeck = ({ selectionDeckCount }: SelectionDeckDeckProps) => {
  return (
    <InvertedCard>
      <div className={styles.label}>
        Карт в личной колоде: {selectionDeckCount}
      </div>
    </InvertedCard>
  );
};

export default SelectionDeck;
