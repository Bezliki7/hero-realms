export const URLS = {
  HERO: {
    GET_HEROES: "/hero/heroes",
    HIRE_HERO: "/hero/hire",
    USE_HERO_ACTIONS: "/hero/use-actions",
  },
  PLAYER: {
    CREATE_PLAYER: "/player",
    GET_PLAYERS: "/player/all-players",
    END_PLAYER_MOVE: "/player/end-move/$1",
  },
  BATTLEFIELD: {
    CREATE_BATTLEFIELD: "/battlefield",
    GET_BATTLEFIELD: "/battlefield/$1",
    GET_BATTLEFIELDS: "battlefield/all-battlefields",
  },
} as const;

export const BASE_URL = `${window.location.protocol}//localhost:3000`;
