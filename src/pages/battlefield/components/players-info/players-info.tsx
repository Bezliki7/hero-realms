import { useStore } from "../../hooks/use-store";

const PlayersInfo = () => {
  const store = useStore(["players"]);

  return (
    <>
      {store.players.map((player) => (
        <div key={player.id}>
          {player.name}
          {player.currentTurnPlayer && " сейчас ходит"} - {player.health}hp,
          {player.currentGoldCount}gold, {player.currentDamageCount}dmg
        </div>
      ))}
    </>
  );
};

export default PlayersInfo;
