import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useBattlefield } from "@/hooks/use-battlefield";
import apiClient from "@/api/api-client";

import TradingRow from "./components/trading-row/trading-row";
import battlefieldService from "./services/battlefield.service";
import InvertedCard from "./components/inverted-card/inverted-card";
import PlayerDecks from "./components/player-decks/player-decks";

const Battlefield = () => {
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);

  const handleEndMove = async () => {
    if (player && player.currentTurnPlayer) {
      await apiClient.player.endPlayerMove(player.id);
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

  const player = battlefield?.players?.find(
    (player) => player.id === battlefield.currentPlayerId
  );

  return (
    <>
      {battlefield?.players?.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,{" "}
          {player.currentGoldCount}gold
        </div>
      ))}
      <div className="flex items-center">
        <TradingRow heroes={battlefield?.heroes ?? []} player={player} />
        <InvertedCard />
        <InvertedCard />
      </div>

      <PlayerDecks player={player} />

      {player?.currentTurnPlayer && (
        <Button onClick={handleEndMove}>Закончить ход</Button>
      )}
    </>
  );
};

export default Battlefield;
