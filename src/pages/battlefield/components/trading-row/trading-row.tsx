import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import Card from "../card/card";
import styles from "./trading-row.module.css";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { Player } from "@/api/requests/hero-realms/player/player.interface";
import apiClient from "@/api/api-client";
import { useToast } from "@/hooks/use-toast";

type TradingRowProps = {
  heroes: Hero[];
  player?: Player;
};

const TradingRow = ({ heroes, player }: TradingRowProps) => {
  const { toast } = useToast();

  const filteredHeroes = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_ROW
  );

  const handleClickCard = async (id: number) => {
    if (player?.id) {
      const res = await apiClient.hero.hireHero({
        heroId: id,
        playerId: player?.id,
      });
      if (res.data) {
        toast({ title: "Ошибка", description: res.data });
      }
    }
  };

  return (
    <div className={styles.container}>
      {filteredHeroes.map((hero) => {
        return (
          <div key={hero.id} className={styles.card}>
            <Card hero={hero} onClick={() => handleClickCard(hero.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default TradingRow;
