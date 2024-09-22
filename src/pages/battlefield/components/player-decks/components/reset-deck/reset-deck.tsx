import { Modal } from "@/components/ui/modal";
import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import InvertedCard from "../../../inverted-card/inverted-card";
import Card from "../../../card/card";
import styles from "./reset-deck.module.css";

import { OnClickCardPayload } from "../../../card/card.interface";

type ResetDeckDeckProps = {
  heroes: Hero[];
  isResetDeckModalOpen: boolean;
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  onCloseModal: () => void;
};

const ResetDeck = ({
  heroes,
  isResetDeckModalOpen,
  clickedHeroId,
  onClickCard,
}: ResetDeckDeckProps) => {
  const onClickResetCard = (payload: OnClickCardPayload) => {
    onClickCard({
      id: clickedHeroId.current,
      heroIdForAction: payload.id,
    });
  };

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
              <Card hero={hero} onClick={onClickResetCard} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetDeck;
