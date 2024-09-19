import { useMemo, useState } from "react";

import type { Battlefield } from "@/api/requests/hero-realms/battlefield/battlefield.interface";

import { BatllefieldContext, BatllefieldContextProps } from "./battlefield";

type BattlefieldPoviderProps = {
  battlefield: Battlefield;
  children: React.ReactNode;
};

const BattlefieldPovider = ({
  battlefield,
  children,
}: BattlefieldPoviderProps) => {
  const [state, setState] = useState(battlefield);

  const handleChangeBattlefield = (payload: Partial<Battlefield>) => {
    setState({ ...state, ...payload });
  };

  const value: BatllefieldContextProps = useMemo(
    () => ({
      battlefield: state,
      setBattlefield: handleChangeBattlefield,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return (
    <BatllefieldContext.Provider value={value}>
      {children}
    </BatllefieldContext.Provider>
  );
};

export default BattlefieldPovider;
