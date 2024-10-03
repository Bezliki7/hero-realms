import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiClient from "@/api/api-client";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import styles from "./settings.module.css";
import Form from "./components/form";

const Settings = () => {
  const [battlefields, setBattlefields] = useState<Battlefield[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const players = await apiClient.player.getPlayers();
      const battlefields = await apiClient.battlefield.getBattlefields();
      setBattlefields(battlefields.data);
      setPlayers(players.data);
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <Link to={"/"}>Hero Realms</Link>
      </label>

      <Form battlefields={battlefields} players={players} />
    </div>
  );
};

export default Settings;
