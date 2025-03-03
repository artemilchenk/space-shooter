import { EBoardRegisteredKeys, ETextEntity, ETextNames } from "./Enums";
import { Text } from "pixi.js";

export type TextEntity = {
  id: string;
  type: ETextEntity;
  name: ETextNames;
  textView: Text;
  text: string;
  isDone: boolean;
};

export interface IBoardKey {
  isDown: boolean;
  executeDown: () => void;
  executeUp: () => void;
}

export type TKeyContext = Record<EBoardRegisteredKeys, IBoardKey>;
