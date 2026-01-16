export const URLS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  HERO: {
    GET_HEROES: "/hero/heroes",
    HIRE_HERO: "/hero/hire",
    USE_HERO_ACTIONS: "/hero/use-actions",
  },
  PLAYER: {
    CREATE_PLAYER: "/player",
    GET_PLAYER: "/player/$1",
    GET_PLAYERS: "/player/all-players",
    END_PLAYER_MOVE: "/player/end-move/$1",
    ATTACK_PLAYER: "/player/attack-player",
  },
  BATTLEFIELD: {
    CREATE_BATTLEFIELD: "/battlefield",
    GET_BATTLEFIELD: "/battlefield/$1",
    GET_BATTLEFIELDS: "/battlefield/all-battlefields",
    CLEAR_BATTLEFIELD: "/battlefield/clear/$1",
  },
} as const;

export const BASE_URL = `${window.location.protocol}//localhost:3000`;
