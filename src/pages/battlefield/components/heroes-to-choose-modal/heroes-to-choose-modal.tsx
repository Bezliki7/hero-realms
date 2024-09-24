import { Modal } from "@/components/ui/modal";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import Card from "../card/card";
import styles from "./heroes-to-choose-modal.module.css";

import type { OnClickCardPayload } from "../card/card.interface";

type HeroesToChooseModalProps = {
  heroes: Hero[];
  isChooseModalOpen: boolean;
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  onCloseModal: () => void;
};

const HeroesToChooseModal = ({
  heroes,
  isChooseModalOpen,
  clickedHeroId,
  onClickCard,
  onCloseModal,
}: HeroesToChooseModalProps) => {
  const onChoose = (payload: OnClickCardPayload) => {
    onClickCard({
      id: clickedHeroId.current,
      heroIdForAction: payload.id,
    });
  };

  const clickedHeroBefore = heroes.find(
    (hero) => hero.id === clickedHeroId.current
  );

  const heroWithResetCard = clickedHeroBefore?.actions.some(
    (action) => action.resetCard
  );
  const heroWithSacrificeCard = clickedHeroBefore?.actions.some(
    (action) => action.sacrificeCard
  );

  const filteredHeroes = heroes.filter((hero) => {
    if (clickedHeroId.current === hero.id) {
      return false;
    }
    if (heroWithResetCard) {
      return hero.placement === HERO_PLACEMENT.ACTIVE_DECK;
    }
    if (heroWithSacrificeCard) {
      return (
        hero.placement === HERO_PLACEMENT.ACTIVE_DECK ||
        hero.placement === HERO_PLACEMENT.RESET_DECK
      );
    }
    return false;
  });

  return (
    <div onClick={onCloseModal}>
      {isChooseModalOpen && filteredHeroes.length && (
        <Modal>
          <div>
            Выберите героя для действия
            <div className={styles.cards}>
              {filteredHeroes.map((hero) => (
                <Card hero={hero} onClick={onChoose} />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HeroesToChooseModal;
