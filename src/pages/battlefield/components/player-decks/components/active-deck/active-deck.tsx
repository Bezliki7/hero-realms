import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./active-deck.module.css";
import Card from "../../../card/card";

import type { OnClickCardPayload } from "../../../card/card.interface";

type ActiveDeckProps = {
  heroes: Hero[];
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  setResetDeckModalOpen: () => void;
};

const ActiveDeck = ({ heroes, onClickCard }: ActiveDeckProps) => {
  const sortedHeroes = heroes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      {sortedHeroes.map((hero) => {
        return (
          <div key={hero.id} className={styles.card}>
            <Card hero={hero} onClick={onClickCard} />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveDeck;
