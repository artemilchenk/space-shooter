import { EBoardRegisteredKeys, EntityTypes } from "./Enums";

export interface IBoardKey {
  isDown: boolean;
  executeDown: () => void;
  executeUp: () => void;
}

export type TKeyContext = Record<EBoardRegisteredKeys, IBoardKey>;

export interface IBulletContext {
  type: EntityTypes.HERO | EntityTypes.BOSS;
  x: number;
  y: number;
}

export type TBulletType = EntityTypes.HERO | EntityTypes.BOSS;
