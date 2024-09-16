import styles from "./defenders-row-modal.module.css";
import Card from "../card/card";
import { Popover } from "@/components/ui/popover";
import { PLayer } from "@/api/requests/hero-realms/player/player.interface";
import { HERO_PLACEMENT } from "@/api/requests/hero-realms/hero/hero.constant";

type DefendersRow = {
  currentPlayer?: PLayer;
  opponentPlayer?: PLayer;
  onClose: VoidFunction;
};

const DefendersRow = ({
  currentPlayer,
  opponentPlayer,
  onClose,
}: DefendersRow) => {
  const currentPlayerDefenders = currentPlayer?.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
  );

  const opponentPlayerPlayerDefenders = opponentPlayer?.heroes.filter(
    (hero) => hero.placement === HERO_PLACEMENT.DEFENDERS_ROW
  );

  return (
    <div className={styles.container} onClick={onClose}>
      <Popover modal={true}>
        <div className="w-full flex justify-center items-center">
          {currentPlayerDefenders?.map((defender) => (
            <Card hero={defender} />
          ))}

          {opponentPlayerPlayerDefenders?.map((defender) => (
            <Card hero={defender} />
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default DefendersRow;
