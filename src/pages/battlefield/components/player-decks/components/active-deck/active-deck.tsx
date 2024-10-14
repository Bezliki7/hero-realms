import { useStore } from "@/pages/battlefield/hooks/use-store";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import CardWrapper from "../../../card-wrapper/card-wrapper";
import styles from "./active-deck.module.css";

type ActiveDeckProps = {
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
};

const ActiveDeck = ({ clickedHeroId, onClickCard }: ActiveDeckProps) => {
  const { playerActiveDeck: heroes } = useStore("player");
  const sortedHeroes = heroes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      {sortedHeroes.map((hero) => (
        <CardWrapper
          key={hero.id}
          classname={styles.card}
          hero={hero}
          onClick={(payload) => {
            clickedHeroId.current = hero.id;
            onClickCard(payload);
          }}
        />
      ))}
    </div>
  );
};

export default ActiveDeck;
