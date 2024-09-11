import apiClient from "@/api/api-client";
import { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import { PLayer } from "@/api/requests/hero-realms/player/player.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

export type PlayerInfo = {
  name: string;
  battlefieldId: number;
  battlefieldName: string;
};

const Settings = () => {
  const [state, setState] = useState({ name: "", battlefieldName: "" });
  const [battlefields, setBattlefields] = useState<Battlefield[]>([]);
  const [players, setPlayers] = useState<PLayer[]>([]);

  const playerInfo = useMemo(() => {
    const playerInfo = localStorage.getItem("player-info");

    if (playerInfo) {
      const { name, battlefieldName } = JSON.parse(playerInfo) as PlayerInfo;
      setState({ battlefieldName, name });
    }

    return playerInfo;
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data: players } = await apiClient.player.getPlayers();
      const { data: battlefields } =
        await apiClient.battlefield.getBattlefields();
      setBattlefields(battlefields);
      setPlayers(players);
    };

    fetch();
  }, []);

  const handleSubmit = async () => {
    let battlefieldId = battlefields.find(
      (b) => b.name === state.battlefieldName
    )?.id;
    const playerIsExist = players.some((player) => player.name === state.name);

    if (!battlefieldId) {
      const { data } = await apiClient.battlefield.createBattlefield({
        name: state.battlefieldName,
      });
      battlefieldId = data.id;
    }
    console.log({ battlefieldId });
    const stringified = JSON.stringify({
      name: state.name,
      battlefieldId: battlefieldId,
      battlefieldName: state.battlefieldName,
    });
    localStorage.setItem("player-info", stringified);

    if (!playerIsExist) {
      await apiClient.player.createPlayer({
        battlefieldId: battlefields[0]?.id ?? battlefieldId,
        name: state.name,
      });
    }
  };

  return (
    <div className="flex justify-center gap-5 p-10 flex-col items-center w-full overflow-hidden">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Имя</label>
        <Input
          id="name"
          className="bg-zinc-900 w-80"
          value={state.name}
          disabled={!!playerInfo}
          onChange={({ target }) => setState({ ...state, name: target.value })}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Название поля</label>
        <Input
          id="name"
          className="bg-zinc-900 w-80"
          value={state.battlefieldName}
          disabled={!!playerInfo}
          onChange={({ target }) =>
            setState({ ...state, battlefieldName: target.value })
          }
        />
      </div>

      <div className="flex w-full  items-center gap-1.5 justify-center translate-x-20">
        <Button
          className="w-24 bg-zinc-900"
          onClick={handleSubmit}
          // disabled={!!playerInfo}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Settings;
