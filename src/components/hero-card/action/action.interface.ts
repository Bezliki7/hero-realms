import { Action } from "@/api/requests/hero-realms/hero/hero.interface";

export type ActionProps = {
  action: Action;
  index: number;
  isOpponentsCard: boolean;
  isOptionalActionChecked: boolean;
  onOptionalCheckedChange: (checked: boolean) => void;
  isSomeChoiceUsed: boolean;
  choiceActionId: number;
  onChangeChoiceActionId: (id: number) => void;
};
