import { EBoardRegisteredKeys } from "./Enums";

export const isRegisteredKey = (key: unknown): key is EBoardRegisteredKeys => {
  return (
    key === EBoardRegisteredKeys.LEFT ||
    key === EBoardRegisteredKeys.RIGHT ||
    key === EBoardRegisteredKeys.SPACE
  );
};
