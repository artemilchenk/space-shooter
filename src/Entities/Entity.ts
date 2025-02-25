import { Container } from "pixi.js";
import { EntityTypes } from "../Enums";

export class Entity {
  public readonly type: EntityTypes;
  public readonly id: string;
  private view: Container;

  private isDead: boolean = false;

  constructor(view: Container, type: EntityTypes) {
    this.type = type;
    this.id = `id-${Date.now()}`;
    this.view = view;
  }

  get x() {
    return this.view.x;
  }
  set x(value: number) {
    this.view.x = value;
  }

  get y() {
    return this.view.y;
  }
  set y(value: number) {
    this.view.y = value;
  }

  get width() {
    return this.view.width;
  }

  get height() {
    return this.view.height;
  }

  get isDeadState() {
    return this.isDead;
  }

  dead() {
    this.isDead = true;
  }

  removeFromStage() {
    if (this.view.parent != null) {
      this.view.removeFromParent();
    }
  }
}
