import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import InvertedCard from "../../../inverted-card/inverted-card";
import Card from "../../../card/card";
import styles from "./reset-deck.module.css";

type ResetDeckDeckProps = {
  heroes: Hero[];
};

const ResetDeck = ({ heroes }: ResetDeckDeckProps) => {
  const [isResetDeckModalOpen, setResetDeckModalOpen] = useState(false);

  return (
    <>
      <InvertedCard onClick={() => setResetDeckModalOpen(true)}>
        <div className={styles.label}>
          Карт в колоде сброса: {heroes.length}
        </div>
      </InvertedCard>

      {isResetDeckModalOpen && (
        <Modal onClose={() => setResetDeckModalOpen(false)}>
          <div className={styles.cards}>
            {heroes.map((hero) => (
              <Card hero={hero} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetDeck;
