import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";
import { URLS } from "../../requests.constant";

import type { Hero, HireHeroDto, UseHeroActionsDto } from "./hero.interface";

class HeroService {
  public getHeroes(config?: AxiosRequestConfig) {
    return api.get<Hero[]>(URLS.HERO.GET_HEROES, config);
  }

  public hireHero(dto: HireHeroDto, config?: AxiosRequestConfig) {
    return api.put(URLS.HERO.HIRE_HERO, dto, config);
  }

  public useHeroActions(dto: UseHeroActionsDto, config?: AxiosRequestConfig) {
    return api.put(URLS.HERO.USE_HERO_ACTIONS, dto, config);
  }
}

export default HeroService;
