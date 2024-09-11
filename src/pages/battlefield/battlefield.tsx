import { useEffect, useState } from "react";
import { PlayerInfo } from "../settings/settings";
import { Battlefield as BattlefieldType } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import TradingRow from "./components/trading-row/trading-row";
import battlefieldService from "./services/battlefield.service";

const Battlefield = () => {
  const [state, setState] = useState<BattlefieldType>();

  useEffect(() => {
    const playerInfo = localStorage.getItem("player-info");

    if (playerInfo) {
      const { battlefieldId } = JSON.parse(playerInfo) as PlayerInfo;

      battlefieldService.connect();
      battlefieldService.prepareBattlefield(battlefieldId);
      battlefieldService.onBattlefielIsReady((b) => setState(b));
    }

    return () => {
      battlefieldService.disconnect();
    };
  }, []);

  return (
    <>
      {state?.players.map((player) => (
        <div>
          {player.name} - {player.health}hp
        </div>
      ))}
      <TradingRow heroes={state?.heroes ?? []} />
    </>
  );
};

export default Battlefield;
