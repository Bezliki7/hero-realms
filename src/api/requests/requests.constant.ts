export const URLS = {
  HERO: {
    GET_HEROES: "/hero/heroes",
  },
  PLAYER: {
    CREATE_PLAYER: "/player",
    GET_PLAYERS: "/player/all-players",
  },
  BATTLEFIELD: {
    CREATE_BATTLEFIELD: "/battlefield",
    GET_BATTLEFIELD: "/battlefield/$1",
    GET_BATTLEFIELDS: "battlefield/all-battlefields",
  },
} as const;

export const BASE_URL = `${window.location.protocol}//localhost:3000`;
