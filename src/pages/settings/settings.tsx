import { useEffect, useState } from "react";

import apiClient from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import { PLAYER_INFO_KEY } from "./settings.constant";

import type { PlayerInfo } from "./settings.interface";

const Settings = () => {
  const { battlefield, setBattlefield } = useBattlefield();
  const { player, setPlayer } = usePlayer();

  const [battlefields, setBattlefields] = useState<Battlefield[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [formState, setFormState] = useState({
    btflName: battlefield?.name ?? "",
    name: player?.name ?? "",
  });

  useEffect(() => {
    const fetch = async () => {
      const players = await apiClient.player.getPlayers();
      const battlefields = await apiClient.battlefield.getBattlefields();
      setBattlefields(battlefields.data);
      setPlayers(players.data);
    };

    fetch();
  }, [battlefield?.name, player?.name]);

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

    const battlefieldPlayers = battlefield.players ?? [];
    const isPlayerExistInBatfld = battlefieldPlayers.some(
      (players) => players.id === players.id
    );
    setBattlefield({
      ...battlefield,
      ...(!isPlayerExistInBatfld && {
        players: [...battlefieldPlayers, player],
      }),
    });
    setPlayer(player);

    const playerInfo: PlayerInfo = {
      playerId: player.id,
      battlefieldId: battlefield.id,
    };
    localStorage.setItem(PLAYER_INFO_KEY, JSON.stringify(playerInfo));
  };

  return (
    <div className="flex justify-center gap-5 p-10 flex-col items-center w-full overflow-hidden">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Имя</label>
        <Input
          id="name"
          className="bg-zinc-900 w-80"
          value={formState.name}
          // disabled={!!battlefield?.currentPlayerId}
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
          onChange={({ target }) =>
            setFormState({ ...formState, btflName: target.value })
          }
        />
      </div>

      <div className="flex w-full  items-center gap-1.5 justify-center translate-x-20">
        <Button
          className="w-24 bg-zinc-900"
          onClick={handleSubmit}
          // disabled={!!(battlefield?.currentPlayerId && battlefield?.id)}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Settings;
