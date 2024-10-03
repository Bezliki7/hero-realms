import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

export type FormProps = {
  battlefields: Battlefield[];
  players: Player[];
};
