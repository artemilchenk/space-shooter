import { Entity } from "./Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../Enums";

export class EmittedEntity extends Entity {
  constructor(
    view: Container,
    type: EntityTypes,
    public readonly ownerType: EntityTypes,
    public readonly vectorY: 1 | -1,
  ) {
    super(view, type);
    this.ownerType = ownerType;
  }
}
