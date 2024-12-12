import { Modal } from "@/components/ui/modal";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/api/api-client";
import { useStore } from "@/pages/battlefield/hooks/use-store";

import type { Hero } from "@/api/requests/hero-realms/hero/hero.interface";

import styles from "./supports-row-modal.module.css";
import CardWrapper from "../../card-wrapper/card-wrapper";

type SupportsRowModalProps = {
  heroes: Hero[];
};

const SupportsRowModal = ({ heroes }: SupportsRowModalProps) => {
  const store = useStore();
  const { toast } = useToast();

  const hireHero = async (id: number) => {
    if (store.player?.id) {
      const res = await apiClient.hero.hireHero({
        heroId: id,
        playerId: store.player?.id,
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
    <Modal onClose={() => store.setData({ isSupportsModalOpen: false })}>
      <div className={styles.modalContainer}>
        <div className={styles.cards}>
          {supportHeroes.map((hero) => (
            <CardWrapper
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
