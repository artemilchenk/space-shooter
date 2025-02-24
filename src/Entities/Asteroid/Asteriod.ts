import { Entity } from "../Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";

export class Asteroid extends Entity {
  public readonly type = EntityTypes.ASTEROID;

  constructor(view: Container) {
    super(view);
  }
}
