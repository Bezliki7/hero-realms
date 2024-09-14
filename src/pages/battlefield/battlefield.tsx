import { useEffect, useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";

import TradingRow from "./components/trading-row/trading-row";
import battlefieldService from "./services/battlefield.service";
import InvertedCard from "./components/inverted-card/inverted-card";
import PlayerDecks from "./components/player-decks/player-decks";

const Battlefield = () => {
  const { battlefield, setBattlefield } = useBattlefield();
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    if (battlefield?.id && !isInit) {
      battlefieldService.init(battlefield.id);
      battlefieldService.onBattlefielIsReady((b) => setBattlefield(b));
      if (battlefield.heroes?.length) {
        setInit(true);
      }
    }

    return () => {
      battlefieldService.disconnect();
    };
  }, [battlefield, isInit, setBattlefield]);

  const player = battlefield?.players?.find(
    (player) => player.id === battlefield.currentPlayerId
  );

  return (
    <>
      {battlefield?.players?.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp
        </div>
      ))}
      <div className="flex items-center">
        <TradingRow heroes={battlefield?.heroes ?? []} />
        <InvertedCard />
        <InvertedCard />
      </div>

      <PlayerDecks player={player} />
    </>
  );
};

export default Battlefield;
