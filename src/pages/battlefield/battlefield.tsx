import { useRef, useState } from "react";

import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import TradingRow from "./components/trading-row/trading-row";
import InvertedCard from "./components/inverted-card/inverted-card";
import PlayerDecks from "./components/player-decks/player-decks";
import DefendersRow from "./components/defenders-row-modal/defenders-row-modal";
import { useBattlefieldState } from "./hooks/use-battlefield-state";
import HeroesToChooseModal from "./components/heroes-to-choose-modal/heroes-to-choose-modal";

import type { OnClickCardPayload } from "./components/card/card.interface";

const Battlefield = () => {
  const { toast } = useToast();
  const { battlefield, player, opponentPlayer } = useBattlefieldState();

  const clickedHeroId = useRef(0);
  const [isDefendersModalOpen, setDefendersModalOpen] = useState(false);
  const [isChooseModalOpen, setChooseModalOpen] = useState(false);

  const handleEndMove = async () => {
    if (player.currentTurnPlayer) {
      await apiClient.player.endPlayerMove(player.id);
    }
  };

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
    if (
      player.currentTurnPlayer &&
      (!payload.checkedOptionalActions?.length || payload.heroIdForAction)
    ) {
      await apiClient.hero.useHeroActions({
        heroId: payload.id,
        playerId: player.id,
        choiceActionId: payload.choiceActionId,
        heroIdForAction: payload.heroIdForAction,
      });
      setChooseModalOpen(false);
    } else if (payload.checkedOptionalActions?.length) {
      setChooseModalOpen(true);
    }
  };

  const tradingDeckCount = battlefield.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.TRADING_DECK
  ).length;

  const sacrificialDeckCount = battlefield.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SACRIFICIAL_DECK
  ).length;

  return (
    <>
      {isDefendersModalOpen && (
        <DefendersRow
          currentPlayer={player}
          opponentPlayer={opponentPlayer}
          clickedHeroId={clickedHeroId}
          onClickCard={handleClickCard}
          onClose={() => setDefendersModalOpen(false)}
        />
      )}

      {battlefield.players.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,
          {player.currentGoldCount}gold, {player.currentDamageCount}dmg
        </div>
      ))}

      <div className="flex p-2 gap-8">
        <Button onClick={() => setDefendersModalOpen(true)}>
          Посмотреть на защитников
        </Button>

        <Button
          disabled={!player.currentDamageCount}
          onClick={handleAttackOpponent}
        >
          Атаковать противника
        </Button>
      </div>

      <div className="flex items-center">
        <TradingRow heroes={battlefield?.heroes ?? []} player={player} />
        <InvertedCard>Рынок: {tradingDeckCount}</InvertedCard>
        <InvertedCard>Жертвенная Колода: {sacrificialDeckCount}</InvertedCard>
      </div>

      <PlayerDecks
        player={player}
        clickedHeroId={clickedHeroId}
        onClickCard={handleClickCard}
      />

      {player.currentTurnPlayer && (
        <Button onClick={handleEndMove}>Закончить ход</Button>
      )}

      <HeroesToChooseModal
        heroes={player.heroes}
        clickedHeroId={clickedHeroId}
        onClickCard={handleClickCard}
        isChooseModalOpen={isChooseModalOpen}
        onCloseModal={() => setChooseModalOpen(false)}
      />
    </>
  );
};

export default Battlefield;
