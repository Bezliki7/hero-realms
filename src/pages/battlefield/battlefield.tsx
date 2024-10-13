import { useEffect, useRef, useState } from "react";

import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader/loader";
import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import TradingRow from "./components/trading-row/trading-row";
import PlayerDecks from "./components/player-decks/player-decks";
import DefendersRow from "./components/defenders-row-modal/defenders-row-modal";
import { useBattlefieldState } from "./hooks/use-battlefield-state";
import HeroesToChooseModal from "./components/heroes-to-choose-modal/heroes-to-choose-modal";
import SupportsRowModal from "./components/supports-row-modal/supports-row-modal";
import { useStore } from "./hooks/use-store";
import Footer from "./components/footer/footer";

const Battlefield = () => {
  const clickedHeroId = useRef(0);
  const [isDefendersModalOpen, setDefendersModalOpen] = useState(false);
  const [isSupportsModalOpen, setSupportsModalOpen] = useState(false);

  const store = useStore(["players"]);
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
      {store.players.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,
          {player.currentGoldCount}gold, {player.currentDamageCount}dmg
        </div>
      ))}

      <div className="flex p-2 gap-8">
        <Button onClick={() => setDefendersModalOpen(true)}>Защитники</Button>

        <Button
          disabled={!player.currentDamageCount}
          onClick={handleAttackOpponent}
        >
          Атаковать противника
        </Button>
      </div>

      <div className="flex items-center">
        <TradingRow
          player={player}
          setSupportsModalOpen={setSupportsModalOpen}
        />
      </div>

      <PlayerDecks
        clickedHeroId={clickedHeroId}
        onClickCard={handleClickCard}
      />

      <Footer />

      {store.isChooseModalOpen && (
        <HeroesToChooseModal
          heroes={player.heroes}
          oponentsHeroes={opponentPlayer.heroes}
          clickedHeroId={clickedHeroId.current}
          onClickCard={handleClickCard}
        />
      )}

      {isSupportsModalOpen && (
        <SupportsRowModal
          heroes={battlefield.heroes}
          onClose={() => setSupportsModalOpen(false)}
        />
      )}

      {isDefendersModalOpen && (
        <DefendersRow
          currentPlayer={player}
          opponentPlayer={opponentPlayer}
          clickedHeroId={clickedHeroId}
          onClickCard={handleClickCard}
          onClose={() => setDefendersModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Battlefield;
