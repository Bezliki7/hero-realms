import { createContext } from "react";

import { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

export type BtlfdWithCurrPlayerId = Partial<
  Battlefield & { currentPlayerId: number }
>;

export type BatllefieldContextProps = {
  battlefield?: BtlfdWithCurrPlayerId;
  setBattlefield: (battlefield: BtlfdWithCurrPlayerId) => void;
};

export const BatllefieldContext = createContext({} as BatllefieldContextProps);
