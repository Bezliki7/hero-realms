import styles from "./defenders-row-modal.module.css";
import Card from "../card/card";
import { Popover } from "@/components/ui/popover";
import { Player } from "@/api/requests/hero-realms/player/player.interface";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import apiClient from "@/api/api-client";

type DefendersRow = {
  currentPlayer: Player;
  opponentPlayer: Player;
  onClose: VoidFunction;
};

const DefendersRow = ({
  currentPlayer,
  opponentPlayer,
  onClose,
}: DefendersRow) => {
  const handleClickCard = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();

    await apiClient.hero.useHeroActions({
      heroId: id,
      playerId: currentPlayer.id,
    });
  };

  const handleAttackOpponentsCard = async (
    event: React.MouseEvent,
    heroId: number
  ) => {
    event.stopPropagation();

    if (currentPlayer.currentDamageCount) {
      await apiClient.player.attackPlayer({
        attackingPlayerId: currentPlayer.id,
        defendingPlayerId: opponentPlayer.id,
        heroIdToAttack: heroId,
      });
    }
  };

  const currentPlayerDefenders = currentPlayer.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
  );

  const opponentPlayerPlayerDefenders = opponentPlayer.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
  );

  return (
    <div className={styles.container} onClick={onClose}>
      <Popover modal={true}>
        <div className={styles.modalContainer}>
          {opponentPlayerPlayerDefenders.length ? (
            <div className={styles.cards}>
              {opponentPlayerPlayerDefenders.map((defender) => (
                <Card
                  hero={defender}
                  onClick={(e) => handleAttackOpponentsCard(e, defender.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ height: 370 }} />
          )}

          {currentPlayerDefenders.length ? (
            <div className={styles.cards}>
              {currentPlayerDefenders.map((defender) => (
                <Card
                  hero={defender}
                  onClick={(e) => handleClickCard(e, defender.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ height: 370 }} />
          )}
        </div>
      </Popover>
    </div>
  );
};

export default DefendersRow;
