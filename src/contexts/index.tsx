import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import BattlefieldPovider from "./battlefield/battlefield.provider";
import PlayerPovider from "./player/player.provider";

type ProviderProps = {
  battlefield: Battlefield;
  player: Player;
  children: React.ReactNode;
};

const Providers = ({ battlefield, player, children }: ProviderProps) => {
  return (
    <BattlefieldPovider battlefield={battlefield}>
      <PlayerPovider player={player}>{children}</PlayerPovider>
    </BattlefieldPovider>
  );
};

export default Providers;
