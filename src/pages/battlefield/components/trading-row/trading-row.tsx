import apiClient from "@/api/api-client";
import { useToast } from "@/hooks/use-toast";
import Card from "@/components/hero-card/card";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import type { Player } from "@/api/requests/hero-realms/player/player.interface";
import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import InvertedCard from "../../../../components/inverted-card/inverted-card";
import styles from "./trading-row.module.css";

type TradingRowProps = {
  heroes: Hero[];
  player?: Player;
  setSupportsModalOpen: (value: boolean) => void;
};

const TradingRow = ({
  heroes,
  player,
  setSupportsModalOpen,
}: TradingRowProps) => {
  const { toast } = useToast();

  const baseHeroes = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_ROW
  );

  const [firstSupHero] = heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SUPPORTS_ROW
  );

  const hireHero = async (id: number) => {
    if (player?.id) {
      const res = await apiClient.hero.hireHero({
        heroId: id,
        playerId: player?.id,
      });

      if (res.data) {
        toast({ title: "Ошибка", description: res.data });
      } else {
        toast({ title: "🎉 🎉 🎉 " });
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
      {baseHeroes.map((hero) => {
        return (
          <Card
            key={hero.id}
            classname={styles.card}
            hero={hero}
            onClick={() => hireHero(hero.id)}
          />
        );
      })}

      <Card
        hero={firstSupHero}
        classname={styles.card}
        onClick={() => setSupportsModalOpen(true)}
      />

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
