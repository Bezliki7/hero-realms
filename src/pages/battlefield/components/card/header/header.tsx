import styles from "../card.module.css";

type HeaderProps = {
  fraction?: string;
  name: string;
  price?: number;
};

const Header = ({ fraction, name, price }: HeaderProps) => {
  return (
    <div className={styles.header}>
      {fraction ? (
        <svg width="30" height="30" className="rounded-full">
          <image
            href={`src/assets/images/fractions/${fraction}.png`}
            height="100%"
            width="100%"
          />
        </svg>
      ) : (
        <div />
      )}

      {name}

      {price ? <div className={styles.round}>{price}</div> : <div />}
    </div>
  );
};

export default Header;
