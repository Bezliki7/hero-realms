import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./active-deck.module.css";
import Card from "../../../card/card";

type ActiveDeckProps = {
  heroes: Hero[];
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (id: number) => void;
  setResetDeckModalOpen: () => void;
};

const ActiveDeck = ({
  heroes,
  clickedHeroId,
  onClickCard,
  setResetDeckModalOpen,
}: ActiveDeckProps) => {
  const sortedHeroes = heroes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      {sortedHeroes.map((hero) => {
        const handleClick = (checkedOptionalActions?: number[]) => {
          console.log(checkedOptionalActions);
          if (!checkedOptionalActions?.length) {
            onClickCard(hero.id);
          } else {
            clickedHeroId.current = hero.id;
            setResetDeckModalOpen();
          }
        };

        return (
          <div key={hero.id} className={styles.card}>
            <Card
              hero={hero}
              onClick={(_, { checkedOptionalActions }) =>
                handleClick(checkedOptionalActions)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveDeck;
