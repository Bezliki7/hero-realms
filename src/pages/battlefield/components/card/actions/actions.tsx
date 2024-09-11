import { Action as ActionType } from "@/api/requests/hero-realms/hero/hero.interface";
import { useCallback } from "react";

import styles from "./action.module.css";
import {
  ACTION_CONDITION,
  CONDITIONS_WITH_FOR_EVERY,
} from "@/api/requests/hero-realms/hero/hero.constant";

const Actions = ({ actions }: { actions: ActionType[] }) => {
  const hha = ["id", "heroId", "conditions", "conditions", "isOptional"];

  const getProperties = (action: ActionType) => {
    const isIncludeForEvery = action.conditions.some((condition) =>
      CONDITIONS_WITH_FOR_EVERY.includes(condition)
    );

    return Object.entries(action).map(([actionName, conut]) => {
      if (!hha.includes(actionName) && conut) {
        const key = `${action.id}:${actionName}`;

        const forEveryCond = action.conditions.find((c) =>
          c.includes("for-every")
        );
        return (
          <div key={key}>
            {isIncludeForEvery && forEveryCond} {actionName}
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

  return actions.map((action, index) => {
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
