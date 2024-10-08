import { CONDITIONS_WITH_FOR_EVERY } from "@/api/requests/hero-realms/hero/hero.constant";
import { Checkbox } from "@/components/ui/checkbox";

import type { Action } from "@/api/requests/hero-realms/hero/hero.interface";

import { ADDITIONAL_ACTION_INFO } from "../card.constant";

export const getProperties = (
  action: Action,
  isCheked: boolean,
  onOptionalCheckedChange: (checked: boolean) => void
) => {
  const isIncludeForEvery = action.conditions.some((condition) =>
    CONDITIONS_WITH_FOR_EVERY.includes(condition)
  );

  const propeties = Object.entries(action).map(([actionName, actionValue]) => {
    if (!ADDITIONAL_ACTION_INFO.includes(actionName) && actionValue) {
      const key = `${action.id}:${actionName}`;

      const forEvery =
        isIncludeForEvery &&
        action.conditions.find((condition) => condition.includes("for-every"));

      return (
        <div
          key={key}
          className="flex items-center "
          style={{
            textDecoration: action.isUsed ? "line-through" : "",
          }}
        >
          {action.isOptional && (
            <div
              style={{
                translate: "-280%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={isCheked || action.isUsed}
                disabled={action.isUsed}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={onOptionalCheckedChange}
              />
            </div>
          )}
          {forEvery} {actionName}
          {action.isOptional && "?"}: {actionValue}
        </div>
      );
    }
  });

  return propeties.filter((el) => el);
};
