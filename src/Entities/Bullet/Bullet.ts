import { Entity } from "../Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";

export class Bullet extends Entity {
  public readonly type = EntityTypes.BULLET;

  constructor(view: Container) {
    super(view);
  }
}
