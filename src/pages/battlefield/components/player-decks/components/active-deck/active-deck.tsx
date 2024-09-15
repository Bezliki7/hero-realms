import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./active-deck.module.css";
import Card from "../../../card/card";

type ActiveDeckProps = {
  heroes: Hero[];
  onClickCard: (id: number) => void;
};

const ActiveDeck = ({ heroes, onClickCard }: ActiveDeckProps) => {
  return (
    <div className={styles.container}>
      {heroes.map((hero) => {
        return (
          <div
            key={hero.id}
            className={styles.card}
            onClick={() => onClickCard(hero.id)}
          >
            <Card hero={hero} />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveDeck;
