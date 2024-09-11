import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import Card from "../card/card";
import styles from "./trading-row.module.css";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

const TradingRow = ({ heroes }: { heroes: Hero[] }) => {
  const filteredHeroes = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_ROW
  );

  return (
    <div className={styles.container}>
      {filteredHeroes.map((hero) => {
        return (
          <div key={hero.id} className={styles.card}>
            <Card hero={hero} />
          </div>
        );
      })}
    </div>
  );
};

export default TradingRow;
