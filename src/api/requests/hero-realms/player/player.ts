import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";
import {
  AttackPlayerDto,
  CreatePlayerDto,
  PLayer,
  UpdatePlayerDto,
} from "./player.interface";

class PlayerService {
  public createPlayer(dto: CreatePlayerDto, config?: AxiosRequestConfig) {
    return api.post<PLayer>(URLS.PLAYER.CREATE_PLAYER, dto, config);
  }

  public getPlayers(config?: AxiosRequestConfig) {
    return api.get<PLayer[]>(URLS.PLAYER.GET_PLAYERS, config);
  }

  public updatePlayer(dto: UpdatePlayerDto, config?: AxiosRequestConfig) {
    return api.put<PLayer>(URLS.PLAYER.CREATE_PLAYER, dto, config);
  }

  public endPlayerMove(playerId: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.PLAYER.END_PLAYER_MOVE.replace(
      "$1",
      playerId.toString(10)
    );

    return api.put<PLayer>(normalizedUri, "", config);
  }

  public attackPlayer(dto: AttackPlayerDto, config?: AxiosRequestConfig) {
    // const normalizedUri = URLS.PLAYER.END_PLAYER_MOVE.replace(
    //   "$1",
    //   playerId.toString(10)
    // );

    return api.put<PLayer>(URLS.PLAYER.ATTACK_PLAYER, dto, config);
  }
}

export default PlayerService;
