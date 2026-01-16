import AuthService from "./requests/auth/auth";
import BattlefieldService from "./requests/hero-realms/battlefield/battlefield";
import HeroService from "./requests/hero-realms/hero/hero";
import PlayerService from "./requests/hero-realms/player/player";

class ApiClient {
  public heroRealms: {
    auth: AuthService;
    hero: HeroService;
    player: PlayerService;
    battlefield: BattlefieldService;
  };

  constructor() {
    this.heroRealms = {
      auth: new AuthService(),
      hero: new HeroService(),
      player: new PlayerService(),
      battlefield: new BattlefieldService(),
    };
  }
}

export default new ApiClient().heroRealms;
