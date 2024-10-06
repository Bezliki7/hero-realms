import { Modal } from "@/components/ui/modal";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { usePlayer } from "@/hooks/use-player";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/api/api-client";
import Card from "@/components/hero-card/card";

import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./supports-row-modal.module.css";

type SupportsRowModalProps = {
  heroes: Hero[];
  onClose: VoidFunction;
};

const SupportsRowModal = ({ heroes, onClose }: SupportsRowModalProps) => {
  const { player } = usePlayer();
  const { toast } = useToast();

  const hireHero = async (id: number) => {
    if (player?.id) {
      const res = await apiClient.hero.hireHero({
        heroId: id,
        playerId: player?.id,
      });

      if (res.data) {
        toast({ title: "Ошибка", description: res.data });
      } else {
        toast({ title: "🎉 🎉 🎉" });
      }
    }
  };

  const supportHeroes = heroes
    .filter(
      (hero) => hero.placement === HERO_PLACEMENT.SUPPORTS_ROW && !hero.playerId
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContainer}>
        <div className={styles.cards}>
          {supportHeroes.map((hero) => (
            <Card
              key={hero.id}
              hero={hero}
              onClick={() => {
                hireHero(hero.id);
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SupportsRowModal;
