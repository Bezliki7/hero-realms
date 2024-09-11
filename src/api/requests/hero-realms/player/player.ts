import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";
import { CreatePlayerDto, PLayer, UpdatePlayerDto } from "./player.interface";

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
}

export default PlayerService;
