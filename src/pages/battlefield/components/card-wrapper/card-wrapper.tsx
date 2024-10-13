import Card from "@/components/hero-card/card";
import { CardProps } from "@/components/hero-card/card.interface";
import { useStore } from "../../hooks/use-store";

const CardWrapper = ({ hero, ...props }: CardProps) => {
  const store = useStore(`hero-${hero.id}`);

  const currentHero = store.heroes.find(({ id }) => hero.id === id);

  if (!currentHero) {
    return null;
  }

  return <Card hero={currentHero} {...props} />;
};

export default CardWrapper;
