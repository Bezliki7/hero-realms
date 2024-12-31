import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";

import type {
  Battlefield,
  CreateBattlefieldDto,
  UpdateBattlefieldDto,
} from "./battlefield.interface";

class BattlefieldService {
  public createBattlefield(
    dto: CreateBattlefieldDto,
    config?: AxiosRequestConfig
  ) {
    return api.post<Battlefield>(
      URLS.BATTLEFIELD.CREATE_BATTLEFIELD,
      dto,
      config
    );
  }

  public updateBattlefield(
    id: number,
    dto: UpdateBattlefieldDto,
    config?: AxiosRequestConfig
  ) {
    const normalizedUri = URLS.BATTLEFIELD.GET_BATTLEFIELD.replace(
      "$1",
      id.toString()
    );

    return api.put(normalizedUri, dto, config);
  }

  public getBattlefield(id: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.BATTLEFIELD.GET_BATTLEFIELD.replace(
      "$1",
      id.toString()
    );

    return api.get<Battlefield>(normalizedUri, config);
  }

  public getBattlefields(config?: AxiosRequestConfig) {
    return api.get<Battlefield[]>(URLS.BATTLEFIELD.GET_BATTLEFIELDS, config);
  }

  public clearBattleFiled(id: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.BATTLEFIELD.CLEAR_BATTLEFIELD.replace(
      "$1",
      id.toString()
    );

    return api.put(normalizedUri, undefined, config);
  }
}

export default BattlefieldService;
