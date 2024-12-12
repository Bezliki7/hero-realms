import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import apiClient from "@/api/api-client";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";

import { useStore } from "../../../hooks/use-store";
import CardWrapper from "../../card-wrapper/card-wrapper";
import styles from "./defenders-row-modal.module.css";

type DefendersRow = {
  clickedHeroId: React.MutableRefObject<number>;
};

const DefendersRow = ({ clickedHeroId }: DefendersRow) => {
  const store = useStore(["players"]);
  const { toast } = useToast();

  const handleAttackOpponentsCard = async (heroId: number) => {
    if (store.player?.currentDamageCount) {
      const res = await apiClient.player.attackPlayer({
        attackingPlayerId: store.player.id,
        defendingPlayerId: store.opponentPlayer.id,
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

  const handleClickCard = async (payload: OnClickCardPayload) => {
    if (!store.player?.currentTurnPlayer) {
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

  const currentPlayerDefenders =
    store.heroes
      .filter(
        (hero) =>
          hero.playerId === store.currentPlayerId &&
          hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
      )
      .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  const opponentPlayerPlayerDefenders = store.heroes
    .filter(
      (hero) =>
        hero.playerId !== store.currentPlayerId &&
        hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Modal onClose={() => store.setData({ isDefendersModalOpen: false })}>
      <div className={styles.modalContainer}>
        {opponentPlayerPlayerDefenders.length ? (
          <div className={styles.cards}>
            {opponentPlayerPlayerDefenders.map((defender) => (
              <CardWrapper
                key={defender.id}
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
              <CardWrapper
                key={defender.id}
                hero={defender}
                onClick={(payload) => {
                  clickedHeroId.current = defender.id;
                  handleClickCard(payload);
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
