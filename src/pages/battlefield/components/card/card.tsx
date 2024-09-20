import { useMemo } from "react";

import Action from "./action/action";
import Header from "./header/header";
import { PROTECTION_BG_COLOR } from "./card.constant";
import styles from "./card.module.css";

import type { CardProps } from "./card.interface";

const Card = ({ hero, onClick }: CardProps) => {
  const sortedActions = useMemo(
    () =>
      hero.actions.sort((a, b) => a.conditions.length - b.conditions.length),
    [hero.actions]
  );

  return (
    <section className={styles.container} onClick={onClick}>
      <Header name={hero.name} price={hero.price} fraction={hero.fraction} />

      <svg className={styles.image}>
        <image
          href={`src/assets/images/heroes/${hero.image}`}
          className="w-full h-full"
        />
      </svg>

      {sortedActions.map((action, index) => (
        <Action key={action.id} action={action} index={index} />
      ))}

      {hero.protection && (
        <footer
          className={styles.footer}
          style={{
            backgroundColor: hero.isGuardian
              ? PROTECTION_BG_COLOR.GRAY
              : PROTECTION_BG_COLOR.WHITE,
          }}
        >
          {hero.protection}
        </footer>
      )}
    </section>
  );
};

export default Card;
