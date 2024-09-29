import { io, Socket } from "socket.io-client";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import { CLIENT_MESSAGES, WS_URL } from "./battlefield.constant";

class battlefieldWsService {
  public socket: Socket;

  constructor(playerId: number) {
    this.socket = io(WS_URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        userId: playerId,
      },
    });
  }

  public connect() {
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

  public subscribeToNeedResetCard(callback: () => void) {
    this.socket.on(CLIENT_MESSAGES.NEED_TO_RESET_CARD, callback);
  }
}

export default battlefieldWsService;
