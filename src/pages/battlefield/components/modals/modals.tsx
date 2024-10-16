import { useToast } from "@/hooks/use-toast";
import { useBattlefield } from "@/hooks/use-battlefield";
import { usePlayer } from "@/hooks/use-player";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

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
  const { toast } = useToast();
  const { player } = usePlayer();
  const { battlefield } = useBattlefield();

  const handleClickCard = async (payload: OnClickCardPayload) => {
    if (!player.currentTurnPlayer) {
      toast({
        title: "Ошибка",
        description: "Сейчас ход другого игрока",
      });
      return;
    }

    await store.useHeroActions(payload, () => {
      clickedHeroId.current = 0;
    });
  };

  return (
    <>
      {store.isChooseModalOpen && (
        <HeroesToChooseModal
          heroes={player.heroes}
          oponentsHeroes={store.opponentPlayer.heroes}
          clickedHeroId={clickedHeroId.current}
        />
      )}

      {store.isSupportsModalOpen && (
        <SupportsRowModal heroes={battlefield.heroes} />
      )}

      {store.isDefendersModalOpen && (
        <DefendersRow
          currentPlayer={player}
          opponentPlayer={store.opponentPlayer}
          clickedHeroId={clickedHeroId}
          onClickCard={handleClickCard}
        />
      )}
    </>
  );
};

export default Modals;
