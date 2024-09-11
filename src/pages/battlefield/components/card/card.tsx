import Actions from "./actions/actions";
import { CardProps } from "./card.interface";
import styles from "./card.module.css";

const Card = ({ hero }: CardProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <svg width="30" height="30" className="rounded-full">
          <image
            href={`src/assets/images/fractions/${hero.fraction}.png`}
            height="100%"
            width="100%"
          />
        </svg>

        {hero.name}

        <div className={styles.round}>{hero.price}</div>
      </div>

      <svg width="350" height="200" className="pt-1">
        <image
          href={`src/assets/images/heroes/${hero.image}`}
          height="100%"
          width="100%"
        />
      </svg>

      <Actions actions={hero.actions} />

      {hero.protection && (
        <footer
          className={styles.footer}
          style={{
            backgroundColor: hero.isGuardian
              ? "rgb(75, 75, 75)"
              : "rgb(175, 175, 175)",
          }}
        >
          {hero.protection}
        </footer>
      )}
    </section>
  );
};

export default Card;
