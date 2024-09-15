import styles from "./inverted-card.module.css";

type InvertedCardProps = {
  children?: React.ReactNode;
};

const InvertedCard = ({ children }: InvertedCardProps) => {
  return <div className={styles.invertedCard}>{children}</div>;
};

export default InvertedCard;
