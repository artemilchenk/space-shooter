import { Entity } from "./Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../Enums";

export class EmittiveEntity extends Entity {
  emittedType = EntityTypes.BULLET;
  constructor(
    view: Container,
    type: EntityTypes,
    public readonly emitiveVectorY: -1 | 1,
    public shots: number,
    public readonly emitiveShiftX: number,
    public readonly emitiveShiftY: number,
  ) {
    super(view, type);
  }
  shot() {
    if (this.shots > 0) this.shots--;
  }
}
