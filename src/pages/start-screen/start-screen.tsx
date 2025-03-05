import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";
import styles from "./start-screen.module.css";

const StartScreen = () => {
  return (
    <div className="flex justify-center gap-10 p-10 flex-col items-center">
      <Link to={"battlefield"}>
        <Button className={cn("bg-zinc-900", styles.button)}>В битву</Button>
      </Link>

      <Link to={"all-heroes"}>
        <Button className={cn("bg-zinc-900", styles.button)}>Все герои</Button>
      </Link>

      <Link to={"settings"}>
        <Button className={cn("bg-zinc-900", styles.button)}>Настройки</Button>
      </Link>
    </div>
  );
};

export default StartScreen;
