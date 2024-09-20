import { Action as ActionType } from "@/api/requests/hero-realms/hero/hero.interface";

import {
  ACTION_CONDITION,
  CONDITIONS_WITH_FOR_EVERY,
} from "@/api/requests/hero-realms/hero/hero.constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getProperties } from "../utils/get-action-properties";
import styles from "./action.module.css";

const Action = ({ action, index }: { action: ActionType; index: number }) => {
  const isConditionsEmpty = !action.conditions.length;

  const isConditionWithForEvery = action.conditions.some((condition) =>
    CONDITIONS_WITH_FOR_EVERY.includes(condition)
  );

  const isConditionWithFraction = action.conditions.includes(
    ACTION_CONDITION.FRACTION
  );

  const isConditionWithChoice = action.conditions.includes(
    ACTION_CONDITION.CHOICE
  );

  const isConditionWithSacrifice = action.conditions.includes(
    ACTION_CONDITION.SACRIFICE
  );

  switch (true) {
    case isConditionsEmpty ||
      (isConditionWithForEvery && action.conditions.length === 1): {
      return getProperties(action);
    }

    case isConditionWithFraction: {
      return (
        <div className={styles.divider}>
          fraction
          <div className={styles.property}>{getProperties(action)}</div>
        </div>
      );
    }

    case isConditionWithSacrifice: {
      return (
        <div className={styles.divider}>
          sacrifice
          <div className={styles.property}>{getProperties(action)}</div>
        </div>
      );
    }

    case isConditionWithChoice: {
      const actionProperties = getProperties(action).filter((el) => el);

      return (
        <>
          {!index && "choice"}

          <RadioGroup className="flex justify-around w-full pl-10">
            {actionProperties.map((el) => (
              <div className="flex items-center space-x-2 w-full">
                <RadioGroupItem id={el?.type} value={el?.type} />
                <label htmlFor={el?.type} />
                {el}
              </div>
            ))}
          </RadioGroup>
        </>
      );
    }

    default: {
      return null;
    }
  }
};

export default Action;
