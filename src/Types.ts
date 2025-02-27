import { EBoardRegisteredKeys, EntityTypes } from "./Enums";

export interface IBoardKey {
  isDown: boolean;
  executeDown: () => void;
  executeUp: () => void;
}

export type TKeyContext = Record<EBoardRegisteredKeys, IBoardKey>;
