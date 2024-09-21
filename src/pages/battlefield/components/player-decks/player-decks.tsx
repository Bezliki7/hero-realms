import { useRef, useState } from "react";

import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import apiClient from "@/api/api-client";

import ActiveDeck from "./components/active-deck/active-deck";
import SelectionDeck from "./components/selection-deck/selection-deck";
import ResetDeck from "./components/reset-deck/reset-deck";

import type {
  HandleClickCardParams,
  PlayerDecksProps,
} from "./player-deck.interface";

const PlayerDecks = ({ player }: PlayerDecksProps) => {
  const clickedHeroId = useRef(0);
  const [isResetDeckModalOpen, setResetDeckModalOpen] = useState(false);

  const handleClickCard = async (params: HandleClickCardParams) => {
    console.log(params);
    if (player.currentTurnPlayer) {
      await apiClient.hero.useHeroActions({
        heroId: params.id ?? clickedHeroId.current,
        playerId: player.id,
        choiceActionId: params.choiceActionId,
        heroIdForAction: params.heroIdForAction,
      });
    }
  };

  const activeDeck =
    player.heroes.filter(
      (hero) => hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    ) ?? [];

  const selectionDeckCount = player.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SELECTION_DECK
  ).length;

  const resetDeck = player.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.RESET_DECK
  );

  return (
    <div>
      <div className="flex items-center">
        <ActiveDeck
          heroes={activeDeck}
          clickedHeroId={clickedHeroId}
          onClickCard={(id) => handleClickCard({ id })}
          setResetDeckModalOpen={() => setResetDeckModalOpen(true)}
        />
        <SelectionDeck selectionDeckCount={selectionDeckCount} />
        <ResetDeck
          heroes={resetDeck}
          isResetDeckModalOpen={isResetDeckModalOpen}
          onClickCard={(heroIdForAction) =>
            handleClickCard({ heroIdForAction })
          }
          onCloseModal={() => setResetDeckModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default PlayerDecks;
