import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import apiClient from "@/api/api-client";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";
import Card from "@/components/hero-card/card";

import type { OnClickCardPayload } from "@/components/hero-card/card.interface";
import type { Player } from "@/api/requests/hero-realms/player/player.interface";

import { useStore } from "../../../hooks/use-store";
import styles from "./defenders-row-modal.module.css";

type DefendersRow = {
  opponentPlayer: Player;
  clickedHeroId: React.MutableRefObject<number>;
};

const DefendersRow = ({ opponentPlayer, clickedHeroId }: DefendersRow) => {
  const store = useStore(["heroes", "player"]);
  const { toast } = useToast();

  const handleAttackOpponentsCard = async (heroId: number) => {
    if (store.player?.currentDamageCount) {
      const res = await apiClient.player.attackPlayer({
        attackingPlayerId: store.player.id,
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
    store.player?.heroes
      .filter((hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW)
      .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  const opponentPlayerPlayerDefenders = opponentPlayer.heroes
    .filter((hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Modal onClose={() => store.setData({ isDefendersModalOpen: false })}>
      <div className={styles.modalContainer}>
        {opponentPlayerPlayerDefenders.length ? (
          <div className={styles.cards}>
            {opponentPlayerPlayerDefenders.map((defender) => (
              <Card
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
              <Card
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
