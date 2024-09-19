import { createContext } from "react";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

export type BatllefieldContextProps = {
  battlefield: Battlefield;
  setBattlefield: (battlefield: Partial<Battlefield>) => void;
};

export const BatllefieldContext = createContext({} as BatllefieldContextProps);
