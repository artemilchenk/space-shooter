import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";
import { EmittedEntity } from "../EmittedEntity";

export class Bullet extends EmittedEntity {
  private speed = 20;
  constructor(view: Container, ownerType: EntityTypes) {
    super(view, EntityTypes.BULLET, ownerType);
  }

  move() {
    this.y -= this.speed;
  }
}
