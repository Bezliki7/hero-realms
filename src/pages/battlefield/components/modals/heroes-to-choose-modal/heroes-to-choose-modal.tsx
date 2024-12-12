import { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import Card from "@/components/hero-card/card";
import { useStore } from "@/pages/battlefield/hooks/use-store";

import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import styles from "./heroes-to-choose-modal.module.css";

type HeroesToChooseModalProps = {
  oponentsHeroes: Hero[];
  clickedHeroId: number;
};

const HeroesToChooseModal = ({
  oponentsHeroes,
  clickedHeroId,
}: HeroesToChooseModalProps) => {
  const store = useStore();

  const onChoose = async (payload: OnClickCardPayload) => {
    if (clickedHeroId) {
      await store.useHeroActions({
        id: clickedHeroId,
        heroIdForAction: payload.id,
      });
    } else {
      store.wsService.resetCard(payload.id);
      store.setData({ isChooseModalOpen: false });
    }
  };

  const clickedHeroBefore = store.heroes.find(
    (hero) => hero.id === clickedHeroId
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

  const filteredHeroesToChoose = store.heroes.filter((hero) => {
    if (clickedHeroId === hero.id) {
      return false;
    }

    if (!clickedHeroId) {
      return hero.placement === HERO_PLACEMENT.ACTIVE_DECK;
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
    filteredHeroesToChoose.length = 0;
    const opponentsHero = oponentsHeroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
    );
    filteredHeroesToChoose.push(...opponentsHero);
  }

  useEffect(() => {
    if (!filteredHeroesToChoose.length) {
      const stageEmptyAction = async () => {
        console.log("stageEmptyAction");
        await store.useHeroActions({ id: clickedHeroId });
      };

      stageEmptyAction();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHeroesToChoose.length]);

  return (
    <div onClick={() => store.setData({ isChooseModalOpen: false })}>
      {filteredHeroesToChoose.length ? (
        <Modal zIndex={100}>
          <div>
            Выберите героя для действия
            <div className={styles.cards}>
              {filteredHeroesToChoose.map((hero) => (
                <Card key={hero.id} hero={hero} onClick={onChoose} />
              ))}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default HeroesToChooseModal;
