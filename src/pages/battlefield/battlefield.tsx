import { useState } from "react";

import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";

import TradingRow from "./components/trading-row/trading-row";
import InvertedCard from "./components/inverted-card/inverted-card";
import PlayerDecks from "./components/player-decks/player-decks";
import DefendersRow from "./components/defenders-row-modal/defenders-row-modal";
import { useBattlefieldState } from "./hooks/use-battlefield-state";

const Battlefield = () => {
  const { battlefield, player, opponentPlayer } = useBattlefieldState();
  const [isDefendersModalOpen, setDefendersModalOpen] = useState(false);

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
        alert(res.data);
      }
    }
  };

  return (
    <>
      {isDefendersModalOpen && (
        <DefendersRow
          currentPlayer={player}
          opponentPlayer={opponentPlayer}
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

        <Button onClick={handleAttackOpponent}>Атаковать противника</Button>
      </div>

      <div className="flex items-center">
        <TradingRow heroes={battlefield?.heroes ?? []} player={player} />
        <InvertedCard />
        <InvertedCard />
      </div>

      <PlayerDecks player={player} />

      {player.currentTurnPlayer && (
        <Button onClick={handleEndMove}>Закончить ход</Button>
      )}
    </>
  );
};

export default Battlefield;
