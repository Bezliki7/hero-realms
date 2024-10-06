import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./active-deck.module.css";
import { OnClickCardPayload } from "@/components/hero-card/card.interface";
import Card from "@/components/hero-card/card";

type ActiveDeckProps = {
  heroes: Hero[];
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
};

const ActiveDeck = ({
  heroes,
  clickedHeroId,
  onClickCard,
}: ActiveDeckProps) => {
  const sortedHeroes = heroes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      {sortedHeroes.map((hero) => {
        return (
          <Card
            key={hero.id}
            classname={styles.card}
            hero={hero}
            onClick={(payload) => {
              clickedHeroId.current = hero.id;
              onClickCard(payload);
            }}
          />
        );
      })}
    </div>
  );
};

export default ActiveDeck;
