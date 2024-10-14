import { useEffect, useRef } from "react";

import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader/loader";
import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import TradingRow from "./components/trading-row/trading-row";
import PlayerDecks from "./components/player-decks/player-decks";
import { useBattlefieldState } from "./hooks/use-battlefield-state";
import { useStore } from "./hooks/use-store";
import Footer from "./components/footer/footer";
import PlayersInfo from "./components/players-info/players-info";
import Modals from "./components/modals/modals";

const Battlefield = () => {
  const clickedHeroId = useRef(0);

  const store = useStore("heroes");
  const { toast } = useToast();
  const { player } = usePlayer();
  const { battlefield } = useBattlefield();
  const { opponentPlayer } = useBattlefieldState();

  useEffect(() => {
    store.init(battlefield, player.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAttackOpponent = async () => {
    if (player.currentDamageCount && opponentPlayer) {
      const res = await apiClient.player.attackPlayer({
        attackingPlayerId: player?.id,
        defendingPlayerId: opponentPlayer?.id,
      });
      if (res.data) {
        toast({
          title: "Ошибка",
          description: res.data,
        });
      }
    }
  };

  const handleClickCard = async (payload: OnClickCardPayload) => {
    if (!player.currentTurnPlayer) {
      toast({
        title: "Ошибка",
        description: "Сейчас ход другого игрока",
      });
      return;
    }

    await store.useHeroActions(payload, () => {
      clickedHeroId.current = 0;
    });
  };

  if (!store.heroes.length) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden">
      <PlayersInfo />

      <div className="flex p-2 gap-8">
        <Button onClick={() => store.setData({ isDefendersModalOpen: true })}>
          Защитники
        </Button>

        <Button
          disabled={!player.currentDamageCount}
          onClick={handleAttackOpponent}
        >
          Атаковать противника
        </Button>
      </div>

      <div className="flex items-center">
        <TradingRow player={player} />
      </div>

      <PlayerDecks
        clickedHeroId={clickedHeroId}
        onClickCard={handleClickCard}
      />

      <Footer />

      <Modals clickedHeroId={clickedHeroId} />
    </div>
  );
};

export default Battlefield;
