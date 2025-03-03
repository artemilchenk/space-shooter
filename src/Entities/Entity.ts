import { Container } from "pixi.js";
import { EntityTypes } from "../Enums";

export class Entity {
  id: string;
  public isActive = true;
  public readonly type: EntityTypes;
  private view: Container;

  public isDead: boolean = false;

  constructor(view: Container, type: EntityTypes) {
    this.type = type;
    this.view = view;
    this.id = Math.random().toString(36).substr(2, 9);
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

  dead() {
    this.isActive = false;
    this.isDead = true;
  }

  removeFromStage() {
    if (this.view.parent != null) {
      this.view.removeFromParent();
    }
  }
}
