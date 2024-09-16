import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useBattlefield } from "@/hooks/use-battlefield";
import apiClient from "@/api/api-client";

import TradingRow from "./components/trading-row/trading-row";
import battlefieldService from "./services/battlefield.service";
import InvertedCard from "./components/inverted-card/inverted-card";
import PlayerDecks from "./components/player-decks/player-decks";
import DefendersRow from "./components/defenders-row-modal/defenders-row-modal";

const Battlefield = () => {
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);
  const [isDefendersModalOpen, setDefendersModalOpen] = useState(false);

  const handleEndMove = async () => {
    if (currentPlayer && currentPlayer.currentTurnPlayer) {
      await apiClient.player.endPlayerMove(currentPlayer.id);
    }
  };

  useEffect(() => {
    if (battlefield?.id && !isInit) {
      battlefieldService.connect();
      battlefieldService.prepareBattlefield(battlefield.id);
      battlefieldService.subscribeToUpdatedBattlefield((b) =>
        setBattlefield(b)
      );
      if (battlefield.heroes?.length) {
        setInit(true);
      }
    }
  }, [battlefield, isInit, setBattlefield]);

  const currentPlayer = battlefield?.players?.find(
    (player) => player.id === battlefield.currentPlayerId
  );
  const opponentPlayer = battlefield?.players?.filter(
    ({ id }) => id !== currentPlayer?.id
  )?.[0];

  return (
    <>
      {isDefendersModalOpen && (
        <DefendersRow
          currentPlayer={currentPlayer}
          opponentPlayer={opponentPlayer}
          onClose={() => setDefendersModalOpen(false)}
        />
      )}

      {battlefield?.players?.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,
          {player.currentGoldCount}gold, {player.currentDamageCount}dmg
        </div>
      ))}

      <Button onClick={() => setDefendersModalOpen(true)}>
        Посмотреть на защитников
      </Button>

      <div className="flex items-center">
        <TradingRow heroes={battlefield?.heroes ?? []} player={currentPlayer} />
        <InvertedCard />
        <InvertedCard />
      </div>

      <PlayerDecks player={currentPlayer} />

      {currentPlayer?.currentTurnPlayer && (
        <Button onClick={handleEndMove}>Закончить ход</Button>
      )}
    </>
  );
};

export default Battlefield;
