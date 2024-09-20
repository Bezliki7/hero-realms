import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";
import {
  AttackPlayerDto,
  CreatePlayerDto,
  Player,
  UpdatePlayerDto,
} from "./player.interface";

class PlayerService {
  public createPlayer(dto: CreatePlayerDto, config?: AxiosRequestConfig) {
    return api.post<Player>(URLS.PLAYER.CREATE_PLAYER, dto, config);
  }

  public getPlayer(id: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.PLAYER.GET_PLAYER.replace("$1", id.toString());

    return api.get<Player>(normalizedUri, config);
  }

  public getPlayers(config?: AxiosRequestConfig) {
    return api.get<Player[]>(URLS.PLAYER.GET_PLAYERS, config);
  }

  public updatePlayer(dto: UpdatePlayerDto, config?: AxiosRequestConfig) {
    return api.put<Player>(URLS.PLAYER.CREATE_PLAYER, dto, config);
  }

  public endPlayerMove(playerId: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.PLAYER.END_PLAYER_MOVE.replace(
      "$1",
      playerId.toString(10)
    );

    return api.put<Player>(normalizedUri, "", config);
  }

  public attackPlayer(dto: AttackPlayerDto, config?: AxiosRequestConfig) {
    return api.put<string | undefined>(URLS.PLAYER.ATTACK_PLAYER, dto, config);
  }
}

export default PlayerService;
