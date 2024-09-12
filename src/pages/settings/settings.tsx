import { useEffect, useState } from "react";

import apiClient from "@/api/api-client";
import { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import { PLayer } from "@/api/requests/hero-realms/player/player.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBattlefield } from "@/hooks/use-battlefield";

import type { PlayerInfo } from "./settings.interface";

const Settings = () => {
  const { battlefield, setBattlefield } = useBattlefield();

  const [battlefields, setBattlefields] = useState<Battlefield[]>([]);
  const [players, setPlayers] = useState<PLayer[]>([]);
  const [formState, setFormState] = useState({ btflName: "", name: "" });

  useEffect(() => {
    const fetch = async () => {
      const players = await apiClient.player.getPlayers();
      const battlefields = await apiClient.battlefield.getBattlefields();
      setBattlefields(battlefields.data);
      setPlayers(players.data);

      const name = players.data.find(
        (player) => player.id === battlefield?.currentPlayerId
      )?.name;
      setFormState({ btflName: battlefield?.name ?? "", name: name ?? "" });
    };

    fetch();
  }, [battlefield?.currentPlayerId, battlefield?.name]);

  const handleSubmit = async () => {
    let battlefield = battlefields.find((b) => b.name === formState.btflName);
    let player = players.find((player) => player.name === formState.name);

    if (!battlefield) {
      const { data } = await apiClient.battlefield.createBattlefield({
        name: formState.btflName,
      });
      battlefield = data;
    }
    if (!player) {
      const { data } = await apiClient.player.createPlayer({
        battlefieldId: battlefield.id,
        name: formState.name,
      });
      player = data;
    }

    const playerInfo: PlayerInfo = {
      playerId: player.id,
      battlefieldId: battlefield.id,
    };
    localStorage.setItem("player-info", JSON.stringify(playerInfo));

    const battlefieldPlayers = battlefield.players ?? [];
    const isPlayerExistInBatfld = battlefieldPlayers.some(
      (player) => player.id === player.id
    );
    setBattlefield({
      ...battlefield,
      ...(!isPlayerExistInBatfld && {
        players: [...battlefieldPlayers, player],
      }),
      currentPlayerId: player.id,
    });
  };

  return (
    <div className="flex justify-center gap-5 p-10 flex-col items-center w-full overflow-hidden">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Имя</label>
        <Input
          id="name"
          className="bg-zinc-900 w-80"
          value={formState.name}
          disabled={!!battlefield?.currentPlayerId}
          onChange={({ target }) =>
            setFormState({ ...formState, name: target.value })
          }
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Название поля</label>
        <Input
          id="name"
          className="bg-zinc-900 w-80"
          value={formState.btflName}
          disabled={!!battlefield?.id}
          onChange={({ target }) =>
            setFormState({ ...formState, btflName: target.value })
          }
        />
      </div>

      <div className="flex w-full  items-center gap-1.5 justify-center translate-x-20">
        <Button
          className="w-24 bg-zinc-900"
          onClick={handleSubmit}
          disabled={!!(battlefield?.currentPlayerId && battlefield?.id)}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Settings;
