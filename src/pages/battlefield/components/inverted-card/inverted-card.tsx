import styles from "./inverted-card.module.css";

type InvertedCardProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

const InvertedCard = ({ children, onClick }: InvertedCardProps) => {
  return (
    <div className={styles.invertedCard} onClick={onClick}>
      {children}
    </div>
  );
};

export default InvertedCard;
