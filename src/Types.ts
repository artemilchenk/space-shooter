import { EBoardRegisteredKeys } from "./Enums";

export interface IBoardKey {
  isDown: boolean;
  executeDown: () => void;
  executeUp: () => void;
}

export type TKeyContext = Record<EBoardRegisteredKeys, IBoardKey>;

export interface IEntityData {
  x: number;
  y: number;
  width: number;
  height: number;
}
