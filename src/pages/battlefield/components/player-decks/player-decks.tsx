import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

import { PLayer } from "@/api/requests/hero-realms/player/player.interface";

import ActiveDeck from "./components/active-deck/active-deck";
import SelectionDeck from "./components/selection-deck/selection-deck";
import ResetDeck from "./components/reset-deck/selection-deck";
import apiClient from "@/api/api-client";
import Card from "../card/card";

type PlayerDecksProps = {
  player?: PLayer;
};

const PlayerDecks = ({ player }: PlayerDecksProps) => {
  if (!player) {
    return null;
  }

  const handleClickCard = async (id: number) => {
    if (player.currentTurnPlayer) {
      await apiClient.hero.useHeroActions({
        heroId: id,
        playerId: player.id,
      });
    }
  };

  const activeDeckHeroes =
    player.heroes?.filter(
      (hero) => hero.placement === HERO_PLACEMENT.ACTIVE_DECK
    ) ?? [];

  const selectionDeckCount = player.heroes?.filter(
    (hero) => hero.placement === HERO_PLACEMENT.SELECTION_DECK
  ).length;

  const resetDeckCount = player.heroes?.filter(
    (hero) => hero.placement === HERO_PLACEMENT.RESET_DECK
  ).length;

  return (
    <div>
      <div className="flex items-center">
        <ActiveDeck heroes={activeDeckHeroes} onClickCard={handleClickCard} />
        <SelectionDeck selectionDeckCount={selectionDeckCount} />
        <ResetDeck resetDeckCount={resetDeckCount} />
      </div>

      {player.heroes.map(
        (hero) =>
          hero.placement === HERO_PLACEMENT.DEFENDERS_ROW && (
            <Card key={hero.id} hero={hero} />
          )
      )}
    </div>
  );
};

export default PlayerDecks;
