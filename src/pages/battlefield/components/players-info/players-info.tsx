import { Button } from "@/components/ui/button";
import { useStore } from "../../hooks/use-store";
import apiClient from "@/api/api-client";
import { toast } from "@/hooks/use-toast";

const PlayersInfo = () => {
  const store = useStore(["players"]);

  const handleAttackOpponent = async () => {
    if (store.player?.currentDamageCount && store.opponentPlayer) {
      const res = await apiClient.player.attackPlayer({
        attackingPlayerId: store.player?.id,
        defendingPlayerId: store.opponentPlayer.id,
      });
      if (res.data) {
        toast({
          title: "Ошибка",
          description: res.data,
        });
      }
    }
  };

  return (
    <>
      {store.players.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,
          {player.currentGoldCount}gold, {player.currentDamageCount}dmg
        </div>
      ))}

      <div className="flex p-2 gap-8">
        <Button onClick={() => store.setData({ isDefendersModalOpen: true })}>
          Защитники
        </Button>

        <Button
          disabled={!store.player?.currentDamageCount}
          onClick={handleAttackOpponent}
        >
          Атаковать противника
        </Button>
      </div>
    </>
  );
};

export default PlayersInfo;
