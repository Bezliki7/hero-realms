import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import Card from "../card/card";
import styles from "./trading-row.module.css";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { Player } from "@/api/requests/hero-realms/player/player.interface";
import apiClient from "@/api/api-client";
import { useToast } from "@/hooks/use-toast";
import InvertedCard from "../inverted-card/inverted-card";

type TradingRowProps = {
  heroes: Hero[];
  player?: Player;
};

const TradingRow = ({ heroes, player }: TradingRowProps) => {
  const { toast } = useToast();

  const filteredHeroes = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_ROW
  );

  const [firstSupHero] = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SUPPORTS_ROW
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

  const tradingDeckCount = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_DECK
  ).length;

  const sacrificialDeckCount = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SACRIFICIAL_DECK
  ).length;

  return (
    <div className={styles.container}>
      <Card hero={firstSupHero} classname={styles.card} />

      {filteredHeroes.map((hero) => {
        return (
          <Card
            key={hero.id}
            classname={styles.card}
            hero={hero}
            onClick={() => handleClickCard(hero.id)}
          />
        );
      })}

      <InvertedCard classname="h[380px] w-[250px]">
        Рынок: {tradingDeckCount}
      </InvertedCard>
      <InvertedCard classname="h[380px] w-[250px]">
        Жертвенная Колода: {sacrificialDeckCount}
      </InvertedCard>
    </div>
  );
};

export default TradingRow;
