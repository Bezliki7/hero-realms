import { cn } from "@/lib/utils";

import styles from "./inverted-card.module.css";

type InvertedCardProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  classname?: string;
};

const InvertedCard = ({ children, onClick, classname }: InvertedCardProps) => {
  return (
    <div className={cn(styles.invertedCard, classname)} onClick={onClick}>
      {children}
    </div>
  );
};

export default InvertedCard;
