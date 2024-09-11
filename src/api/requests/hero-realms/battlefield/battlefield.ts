import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";
import { Battlefield, CreateBattlefieldDto } from "./battlefield.interface";

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

  public getBattlefields(config?: AxiosRequestConfig) {
    return api.get<Battlefield[]>(URLS.BATTLEFIELD.GET_BATTLEFIELDS, config);
  }

  public prepareBattlefield(id: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.BATTLEFIELD.PREPARE_BATTLEFIELD.replace(
      "$1",
      id.toString()
    );

    return api.get<Battlefield>(normalizedUri, config);
  }
}

export default BattlefieldService;
