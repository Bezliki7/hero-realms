import { io, Socket } from "socket.io-client";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";
import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import { CLIENT_MESSAGES, WS_URL } from "./battlefield.constant";

export class WsService {
  public socket: Socket;

  constructor() {
    this.socket = io(WS_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  public connect(userId?: number) {
    this.socket.auth = { userId };
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket.offAny();
  }

  public init(id: number) {
    this.connect();
    this.prepareBattlefield(id);
  }

  public prepareBattlefield(id: number) {
    this.socket.emit(CLIENT_MESSAGES.PREPARE_BATTLEFIELD, {
      id,
    });
  }

  public resetCard(cardId: number) {
    this.socket.emit(CLIENT_MESSAGES.RESET_CARD, cardId);
  }

  public subscribeToUpdatedBattlefield(
    callback: (battlefield: Battlefield) => void
  ) {
    this.socket.on(CLIENT_MESSAGES.BATTLEFIELD_UPDATED, callback);
  }

  public subscribeToUpdatedPlayers(callback: (players: Player[]) => void) {
    this.socket.on(CLIENT_MESSAGES.PLAYERS_UPDATED, callback);
  }

  public subscribeToUpdatedHero(callback: (hero: Hero) => void) {
    this.socket.on(CLIENT_MESSAGES.HERO_UPDATED, callback);
  }

  public subscribeToNeedResetCard(callback: () => void) {
    this.socket.on(CLIENT_MESSAGES.NEED_TO_RESET_CARD, callback);
  }
}
