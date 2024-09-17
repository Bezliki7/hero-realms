import { Action as ActionType } from "@/api/requests/hero-realms/hero/hero.interface";
import { useCallback, useMemo } from "react";

import styles from "./action.module.css";
import {
  ACTION_CONDITION,
  CONDITIONS_WITH_FOR_EVERY,
} from "@/api/requests/hero-realms/hero/hero.constant";

const ADDITIONAL_ACTION_INFO = [
  "id",
  "heroId",
  "conditions",
  "conditions",
  "isOptional",
  "isUsed",
];

const Actions = ({ actions }: { actions: ActionType[] }) => {
  const getProperties = (action: ActionType) => {
    const isIncludeForEvery = action.conditions.some((condition) =>
      CONDITIONS_WITH_FOR_EVERY.includes(condition)
    );

    return Object.entries(action).map(([actionName, conut]) => {
      if (!ADDITIONAL_ACTION_INFO.includes(actionName) && conut) {
        const key = `${action.id}:${actionName}`;

        const conditionForEvery = action.conditions.find((condition) =>
          condition.includes("for-every")
        );

        return (
          <div
            key={key}
            style={{ textDecoration: action.isUsed ? "line-through" : "" }}
          >
            {isIncludeForEvery && conditionForEvery} {actionName}
            {action.isOptional && "?"}: {conut}
          </div>
        );
      }
    });
  };

  const renderAction = useCallback((action: ActionType) => {
    const isIncludeForEvery = action.conditions.some((condition) =>
      CONDITIONS_WITH_FOR_EVERY.includes(condition)
    );

    switch (true) {
      case !action.conditions.length ||
        (isIncludeForEvery && action.conditions.length === 1): {
        return getProperties(action);
      }

      case action.conditions.includes(ACTION_CONDITION.FRACTION): {
        return (
          <div className={styles.divider}>
            fraction
            <div className="flex justify-center">{getProperties(action)}</div>
          </div>
        );
      }

      case action.conditions.includes(ACTION_CONDITION.CHOICE): {
        return (
          <div>
            <div>{getProperties(action)}</div>
          </div>
        );
      }

      case action.conditions.includes(ACTION_CONDITION.SACRIFICE): {
        return (
          <div className={styles.divider}>
            sacrifice
            <div className="flex justify-center">{getProperties(action)}</div>
          </div>
        );
      }

      default: {
        return null;
      }
    }
  }, []);

  const sortedActions = useMemo(
    () => actions.sort((a, b) => a.conditions.length - b.conditions.length),
    [actions]
  );

  return sortedActions.map((action, index) => {
    if (!index && action.conditions.includes(ACTION_CONDITION.CHOICE)) {
      return (
        <div style={{ width: "80%" }}>
          choice
          <div className="flex justify-center">{getProperties(action)}</div>
        </div>
      );
    }
    return renderAction(action);
  });
};

export default Actions;
