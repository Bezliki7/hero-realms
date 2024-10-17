import { useStore } from "@/pages/battlefield/hooks/use-store";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import CardWrapper from "../../../card-wrapper/card-wrapper";
import styles from "./active-deck.module.css";
import { useToast } from "@/hooks/use-toast";

type ActiveDeckProps = {
  clickedHeroId: React.MutableRefObject<number>;
};

const ActiveDeck = ({ clickedHeroId }: ActiveDeckProps) => {
  const { playerActiveDeck: heroes, ...store } = useStore("heroes");
  const { toast } = useToast();

  const sortedHeroes = heroes.sort((a, b) => a.name.localeCompare(b.name));

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
      {sortedHeroes.map((hero) => (
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
