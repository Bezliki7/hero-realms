import { io, Socket } from "socket.io-client";

import { CLIENT_MESSAGES, WS_URL } from "./battlefield.constant";
import { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

class BattlefieldWsService {
  public socket: Socket;

  constructor() {
    this.socket = io(WS_URL, {
      transports: ["websocket"],
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

  public subscribeToUpdatedBattlefield(
    callback: (battlefield: Battlefield) => void
  ) {
    this.socket.on(CLIENT_MESSAGES.BATTLEFIELD_UPDATED, callback);
  }
}

export default new BattlefieldWsService();
