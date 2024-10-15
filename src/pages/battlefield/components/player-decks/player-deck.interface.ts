export type PlayerDecksProps = {
  clickedHeroId: React.MutableRefObject<number>;
};

export type HandleClickCardParams = {
  id?: number;
  choiceActionId?: number;
  heroIdForAction?: number;
  checkedOptionalActions?: number[];
};
