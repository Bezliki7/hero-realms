import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./active-deck.module.css";
import Card from "../../../card/card";

type ActiveDeckProps = {
  heroes: Hero[];
};

const ActiveDeck = ({ heroes }: ActiveDeckProps) => {
  return (
    <div className={styles.container}>
      {heroes.map((hero) => {
        return (
          <div key={hero.id} className={styles.card}>
            <Card hero={hero} />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveDeck;
