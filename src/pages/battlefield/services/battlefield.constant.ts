import { BASE_URL } from "@/api/requests/requests.constant";

export const WS_URL = `${BASE_URL}/battlefiled`;
export const NAMESPACE = "battlefiled";

export const CLIENT_MESSAGES = {
  PREPARE_BATTLEFIELD: "client:prepare-battlefiled",
  BATTLEFIELD_UPDATED: "client:battlefiled-updated",
  NEED_TO_RESET_CARD: "client:need-to-reset-card",
  RESET_CARD: "client:reset-card",

  PLAYERS_UPDATED: "client:players-updated",
  HERO_UPDATED: "client:hero-updated",
};
