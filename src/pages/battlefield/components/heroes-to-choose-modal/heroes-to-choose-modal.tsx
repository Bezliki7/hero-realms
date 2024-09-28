import { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import Card from "../card/card";
import styles from "./heroes-to-choose-modal.module.css";

import type { OnClickCardPayload } from "../card/card.interface";

type HeroesToChooseModalProps = {
  heroes: Hero[];
  oponentsHeroes: Hero[];
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  onCloseModal: () => void;
};

const HeroesToChooseModal = ({
  heroes,
  oponentsHeroes,
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
  const heroWithPutToDeckResetedCard = clickedHeroBefore?.actions.some(
    (action) => action.putToDeckResetedCard
  );
  const heroWithPrepareHero = clickedHeroBefore?.actions.some(
    (action) => action.prepareHero
  );
  const heroWithStanOpponentsHero = clickedHeroBefore?.actions.some(
    (action) => action.stanOpponentsHero
  );

  const filteredHeroes = heroes.filter((hero) => {
    if (clickedHeroId.current === hero.id) {
      return false;
    }
    if (heroWithPrepareHero) {
      return (
        hero.placement === HERO_PLACEMENT.SELECTION_DECK && hero.protection
      );
    }
    if (heroWithResetCard) {
      return hero.placement === HERO_PLACEMENT.ACTIVE_DECK;
    }
    if (heroWithPutToDeckResetedCard) {
      return hero.placement === HERO_PLACEMENT.RESET_DECK;
    }
    if (heroWithSacrificeCard) {
      return (
        hero.placement === HERO_PLACEMENT.ACTIVE_DECK ||
        hero.placement === HERO_PLACEMENT.RESET_DECK
      );
    }

    return false;
  });

  if (heroWithStanOpponentsHero) {
    filteredHeroes.length = 0;
    const opponentsHero = oponentsHeroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
    );
    filteredHeroes.push(...opponentsHero);
  }

  useEffect(() => {
    if (!filteredHeroes.length) {
      onClickCard({ id: clickedHeroId.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHeroes.length]);

  return (
    <div onClick={onCloseModal}>
      {filteredHeroes.length ? (
        <Modal zIndex={100}>
          <div>
            Выберите героя для действия
            <div className={styles.cards}>
              {filteredHeroes.map((hero) => (
                <Card hero={hero} onClick={onChoose} />
              ))}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default HeroesToChooseModal;
