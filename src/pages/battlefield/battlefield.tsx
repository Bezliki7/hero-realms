import { useEffect, useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";

import TradingRow from "./components/trading-row/trading-row";
import battlefieldService from "./services/battlefield.service";

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

  return (
    <>
      {battlefield?.players?.map((player) => (
        <div key={player.id}>
          {battlefield.currentPlayerId === player.id && <>это ты - </>}
          {player.name} - {player.health}hp
        </div>
      ))}

      <TradingRow heroes={battlefield?.heroes ?? []} />
    </>
  );
};

export default Battlefield;
