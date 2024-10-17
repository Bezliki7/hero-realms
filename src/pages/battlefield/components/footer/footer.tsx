import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";

import { useBattlefield } from "@/hooks/use-battlefield";
import { useStore } from "../../hooks/use-store";

const Footer = () => {
  const store = useStore(["players"]);
  const { battlefield } = useBattlefield();

  const handleEndMove = async () => {
    await store.endPlayerMove();
  };

  const handleClearBattlefield = async () => {
    if (store.players.some((player) => !player.health)) {
      await apiClient.battlefield.clearBattleFiled(battlefield.id);
    }
  };

  return (
    <footer style={{ marginTop: -120 }}>
      {store.player?.currentTurnPlayer && (
        <Button onClick={handleEndMove}>Закончить ход</Button>
      )}

      {store.players.some((player) => !player.health) && (
        <Button onClick={handleClearBattlefield}>Очистить поле битвы</Button>
      )}
    </footer>
  );
};

export default Footer;
