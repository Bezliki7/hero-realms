import styles from "./defenders-row-modal.module.css";
import Card from "../card/card";
import { Player } from "@/api/requests/hero-realms/player/player.interface";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import apiClient from "@/api/api-client";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";
import { OnClickCardPayload } from "../card/card.interface";

type DefendersRow = {
  currentPlayer: Player;
  opponentPlayer: Player;
  clickedHeroId: React.MutableRefObject<number>;
  onClickCard: (payload: OnClickCardPayload) => void;
  onClose: VoidFunction;
  setResetDeckModalOpen: (value: boolean) => void;
};

const DefendersRow = ({
  currentPlayer,
  opponentPlayer,
  clickedHeroId,
  onClickCard,
  onClose,
}: DefendersRow) => {
  const { toast } = useToast();

  const handleAttackOpponentsCard = async (heroId: number) => {
    if (currentPlayer.currentDamageCount) {
      const res = await apiClient.player.attackPlayer({
        attackingPlayerId: currentPlayer.id,
        defendingPlayerId: opponentPlayer.id,
        heroIdToAttack: heroId,
      });
      if (res.data) {
        toast({
          title: "Ошибка",
          description: res.data,
        });
      }
    }
  };

  const currentPlayerDefenders = currentPlayer.heroes
    .filter((hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW)
    .sort((a, b) => a.name.localeCompare(b.name));

  const opponentPlayerPlayerDefenders = opponentPlayer.heroes
    .filter((hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContainer}>
        {opponentPlayerPlayerDefenders.length ? (
          <div className={styles.cards}>
            {opponentPlayerPlayerDefenders.map((defender) => (
              <Card
                isOpponentsCard
                hero={defender}
                onClick={() => handleAttackOpponentsCard(defender.id)}
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
                key={defender.id}
                hero={defender}
                onClick={(payload) => {
                  clickedHeroId.current = defender.id;
                  onClickCard(payload);
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ height: 370 }} />
        )}
      </div>
    </Modal>
  );
};

export default DefendersRow;
