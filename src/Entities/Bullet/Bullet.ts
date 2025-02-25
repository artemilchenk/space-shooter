import { Entity } from "../Entity";
import { Container } from "pixi.js";
import { TBulletType } from "../../Types";
import { EntityTypes } from "../../Enums";

export class Bullet extends Entity {
  public readonly bulletType: TBulletType;

  constructor(view: Container, bulletType: TBulletType) {
    super(view, EntityTypes.BULLET);
    this.bulletType = bulletType;
  }
}
