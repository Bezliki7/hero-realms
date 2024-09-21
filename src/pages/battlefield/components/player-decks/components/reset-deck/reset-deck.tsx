import { Modal } from "@/components/ui/modal";
import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import InvertedCard from "../../../inverted-card/inverted-card";
import Card from "../../../card/card";
import styles from "./reset-deck.module.css";

type ResetDeckDeckProps = {
  heroes: Hero[];
  isResetDeckModalOpen: boolean;
  onClickCard: (heroIdForAction: number) => void;
  onCloseModal: () => void;
};

const ResetDeck = ({
  heroes,
  isResetDeckModalOpen,
  onClickCard,
}: ResetDeckDeckProps) => {
  return (
    <>
      <InvertedCard>
        <div className={styles.label}>
          Карт в колоде сброса: {heroes.length}
        </div>
      </InvertedCard>

      {isResetDeckModalOpen && (
        <Modal>
          Выберите героя для действия
          <div className={styles.cards}>
            {heroes.map((hero) => (
              <Card hero={hero} onClick={() => onClickCard(hero.id)} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetDeck;
