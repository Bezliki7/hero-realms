import {
  ACTION_CONDITION,
  CONDITIONS_WITH_FOR_EVERY,
} from "@/api/requests/hero-realms/hero/hero.constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getProperties } from "../utils/get-action-properties";
import styles from "./action.module.css";

import type { ActionProps } from "./action.interface";

const Action = ({
  action,
  index,
  isOpponentsCard,
  isOptionalActionChecked,
  onOptionalCheckedChange,
  isSomeChoiceUsed,
  choiceActionId,
  onChangeChoiceActionId,
}: ActionProps) => {
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

  const actionPropeties = getProperties(
    action,
    isOptionalActionChecked,
    onOptionalCheckedChange
  );

  switch (true) {
    case isConditionsEmpty ||
      (isConditionWithForEvery && action.conditions.length === 1): {
      return actionPropeties;
    }

    case isConditionWithFraction: {
      return (
        <div className={styles.divider}>
          fraction
          <div className={styles.property}>{actionPropeties}</div>
        </div>
      );
    }

    case isConditionWithSacrifice: {
      return (
        <div className={styles.divider}>
          sacrifice
          <div className={styles.property}>{actionPropeties}</div>
        </div>
      );
    }

    case isConditionWithChoice: {
      return (
        <>
          {!index && "choice"}

          <RadioGroup className="flex justify-around w-full pl-10">
            {actionPropeties.map((el) => (
              <div key={el?.key} className="flex items-center space-x-2 w-full">
                <RadioGroupItem
                  id={el?.type}
                  value={el?.type}
                  disabled={
                    isOpponentsCard || action.isUsed || isSomeChoiceUsed
                  }
                  checked={choiceActionId === action.id || action.isUsed}
                  onClick={(event) => {
                    event.stopPropagation();
                    onChangeChoiceActionId(action.id);
                  }}
                />
                <label htmlFor={el?.type} />

                <div>{el}</div>
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
