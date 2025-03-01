import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";
import { EmittedEntity } from "../EmittedEntity";

export class Bullet extends EmittedEntity {
  private speed = 20;

  constructor(view: Container, ownerType: EntityTypes, vectorY: -1 | 1) {
    super(view, EntityTypes.BULLET, ownerType, vectorY);
  }

  move() {
    this.y = this.y + this.speed * this.vectorY;
  }
}
