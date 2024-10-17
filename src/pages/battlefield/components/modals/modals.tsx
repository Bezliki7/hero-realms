import { useBattlefield } from "@/hooks/use-battlefield";

import { useStore } from "../../hooks/use-store";
import HeroesToChooseModal from "./heroes-to-choose-modal/heroes-to-choose-modal";
import SupportsRowModal from "./supports-row-modal/supports-row-modal";
import DefendersRow from "./defenders-row-modal/defenders-row-modal";

const Modals = ({
  clickedHeroId,
}: {
  clickedHeroId: React.MutableRefObject<number>;
}) => {
  const store = useStore([
    "isChooseModalOpen",
    "isDefendersModalOpen",
    "isSupportsModalOpen",
  ]);
  const { battlefield } = useBattlefield();

  return (
    <>
      {store.isChooseModalOpen && (
        <HeroesToChooseModal
          oponentsHeroes={store.opponentPlayer.heroes}
          clickedHeroId={clickedHeroId.current}
        />
      )}

      {store.isSupportsModalOpen && (
        <SupportsRowModal heroes={battlefield.heroes} />
      )}

      {store.isDefendersModalOpen && (
        <DefendersRow
          opponentPlayer={store.opponentPlayer}
          clickedHeroId={clickedHeroId}
        />
      )}
    </>
  );
};

export default Modals;
