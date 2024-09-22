import { useMemo, useState } from "react";

import { ACTION_CONDITION } from "@/api/requests/hero-realms/hero/hero.constant";

import Action from "./action/action";
import Header from "./header/header";
import { PROTECTION_BG_COLOR } from "./card.constant";
import styles from "./card.module.css";

import type { CardProps } from "./card.interface";

const Card = ({ hero, onClick, isOpponentsCard = false }: CardProps) => {
  const [checkedOptionalActions, setCheckedOptionalActions] = useState<
    number[]
  >([]);
  const [choiceActionId, setChoiceActionId] = useState<number>(
    hero.actions.find((a) => a.isUsed)?.id ?? hero.actions[0].id
  );

  const isSomeChoiceUsed = hero.actions.some(
    (action) =>
      action.conditions.includes(ACTION_CONDITION.CHOICE) && action.isUsed
  );

  const sortedActions = useMemo(() => {
    return hero.actions.sort((a, b) => {
      const isActionConditionWithChoice = a.conditions.some((condition) =>
        condition.includes(ACTION_CONDITION.CHOICE)
      );
      if (isActionConditionWithChoice) {
        return -1;
      }

      if (a.conditions.length || b.conditions.length) {
        return a.conditions.length - b.conditions.length;
      }

      return a.id - b.id;
    });
  }, [hero.actions]);

  const handleUseCard = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isSomeConditionWithChoice = hero.actions.some((action) =>
      action.conditions.includes(ACTION_CONDITION.CHOICE)
    );

    const isSomeActionOptional = hero.actions.some(
      (action) => action.isOptional
    );

    const isSacrificeSelf = hero.actions.some(
      (action) =>
        action.conditions.includes(ACTION_CONDITION.SACRIFICE) &&
        checkedOptionalActions.includes(action.id)
    );

    if (isSomeConditionWithChoice) {
      onClick?.({ id: hero.id, choiceActionId });
    } else if (isSomeActionOptional) {
      onClick?.({
        id: hero.id,
        checkedOptionalActions,
        heroIdForAction: isSacrificeSelf ? hero.id : undefined,
      });
    } else {
      onClick?.({ id: hero.id });
    }
  };

  const handleOptionalCheckedChange = (actionId: number, checked: boolean) => {
    let newCheckedOptionalActions = [...checkedOptionalActions];
    if (checked) {
      newCheckedOptionalActions.push(actionId);
    } else {
      newCheckedOptionalActions = newCheckedOptionalActions.filter(
        (id) => id !== actionId
      );
    }
    setCheckedOptionalActions(newCheckedOptionalActions);
  };

  return (
    <section className={styles.container} onClick={handleUseCard}>
      <Header name={hero.name} price={hero.price} fraction={hero.fraction} />

      <svg className={styles.image}>
        <image
          href={`src/assets/images/heroes/${hero.image}`}
          className="w-full h-full"
        />
      </svg>

      {sortedActions.map((action, index) => (
        <Action
          key={action.id}
          action={action}
          index={index}
          isOpponentsCard={isOpponentsCard}
          isOptionalActionChecked={checkedOptionalActions.includes(action.id)}
          onOptionalCheckedChange={(checked) =>
            handleOptionalCheckedChange(action.id, checked)
          }
          isSomeChoiceUsed={isSomeChoiceUsed}
          choiceActionId={choiceActionId}
          onChangeChoiceActionId={setChoiceActionId}
        />
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
