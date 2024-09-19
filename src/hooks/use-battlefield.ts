import { useContext } from "react";

import { BatllefieldContext } from "@/contexts/battlefield/battlefield";

export const useBattlefield = () => useContext(BatllefieldContext);
