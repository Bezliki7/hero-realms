import React, { useState } from "react";

import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/api/api-client";

import { PLAYER_INFO_KEY } from "../settings.constant";

import type { FormProps } from "./form.interface";
import type { PlayerInfo } from "../settings.interface";

const Form = ({ battlefields, players }: FormProps) => {
  const { battlefield, setBattlefield } = useBattlefield();
  const { player, setPlayer } = usePlayer();
  const { toast } = useToast();

  const [formState, setFormState] = useState({
    btflName: battlefield?.name ?? "",
    name: player?.name ?? "",
  });

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

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
    toast({ description: "Вы успешно авторизовались" });
  };

  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Имя</label>
        <Input
          id="name"
          className="bg-zinc-900 "
          value={formState.name}
          onChange={({ target }) =>
            setFormState({ ...formState, name: target.value })
          }
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="name">Название поля</label>
        <Input
          id="name"
          className="bg-zinc-900"
          value={formState.btflName}
          onChange={({ target }) =>
            setFormState({ ...formState, btflName: target.value })
          }
        />
      </div>
      <div className="flex items-center  justify-end pt-3">
        <Button className="w-24 bg-zinc-900" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default Form;
