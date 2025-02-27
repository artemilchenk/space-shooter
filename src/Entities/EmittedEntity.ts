import { Entity } from "./Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../Enums";

export class EmittedEntity extends Entity {
  constructor(
    view: Container,
    type: EntityTypes,
    public readonly ownerType: EntityTypes,
  ) {
    super(view, type);
    this.ownerType = ownerType;
  }
}
