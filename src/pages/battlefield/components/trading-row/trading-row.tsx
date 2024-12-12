import apiClient from "@/api/api-client";
import { useToast } from "@/hooks/use-toast";
import Card from "@/components/hero-card/card";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import InvertedCard from "../../../../components/inverted-card/inverted-card";
import styles from "./trading-row.module.css";
import { useStore } from "../../hooks/use-store";
import CardWrapper from "../card-wrapper/card-wrapper";

const TradingRow = () => {
  const store = useStore();

  const { toast } = useToast();

  const hireHero = async (id: number) => {
    if (store.player?.id) {
      const res = await apiClient.hero.hireHero({
        heroId: id,
        playerId: store.player?.id,
      });

      if (res.data) {
        toast({ title: "Ошибка", description: res.data });
      } else {
        toast({ title: "🎉 🎉 🎉 " });
      }
    }
  };

  const baseHeroes = store.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_ROW
  );

  const [firstSupHero] = store.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SUPPORTS_ROW
  );

  const tradingDeckCount = store.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_DECK
  ).length;

  const sacrificialDeckCount = store.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SACRIFICIAL_DECK
  ).length;

  return (
    <div className="flex items-center">
      <div className={styles.container}>
        {baseHeroes.map((hero) => {
          return (
            <CardWrapper
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
          onClick={() => store.setData({ isSupportsModalOpen: true })}
        />

        <InvertedCard classname="h[380px] w-[250px]">
          Рынок: {tradingDeckCount}
        </InvertedCard>

        <InvertedCard classname="h[380px] w-[250px]">
          Жертвенная Колода: {sacrificialDeckCount}
        </InvertedCard>
      </div>
    </div>
  );
};

export default TradingRow;
