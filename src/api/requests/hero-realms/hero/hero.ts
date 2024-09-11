import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";
import { Hero } from "./hero.interface";

class HeroService {
  public getHeroes(config?: AxiosRequestConfig) {
    return api.get<Hero[]>(URLS.HERO.GET_HEROES, config);
  }
}

export default HeroService;
