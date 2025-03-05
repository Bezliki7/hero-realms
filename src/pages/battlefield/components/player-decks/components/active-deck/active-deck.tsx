import { useStore } from "@/pages/battlefield/hooks/use-store";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { useToast } from "@/hooks/use-toast";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import CardWrapper from "../../../card-wrapper/card-wrapper";
import styles from "./active-deck.module.css";

type ActiveDeckProps = {
  clickedHeroId: React.MutableRefObject<number>;
};

const ActiveDeck = ({ clickedHeroId }: ActiveDeckProps) => {
  const store = useStore(["players", "heroes"]);
  const { toast } = useToast();

  const activeDeckHeroes = store.heroes
    .filter(
      (hero) =>
        hero.playerId === store.player?.id &&
        hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleUseCard = async (payload: OnClickCardPayload) => {
    if (!store.player?.currentTurnPlayer) {
      toast({
        title: "Ошибка",
        description: "Сейчас ход другого игрока",
      });
      return;
    }

    await store.useHeroActions(payload, () => {
      clickedHeroId.current = 0;
    });
  };

  return (
    <div className={styles.container}>
      {activeDeckHeroes.map((hero) => (
        <CardWrapper
          key={hero.id}
          classname={styles.card}
          hero={hero}
          onClick={(payload) => {
            clickedHeroId.current = hero.id;
            handleUseCard(payload);
          }}
        />
      ))}
    </div>
  );
};

export default ActiveDeck;
