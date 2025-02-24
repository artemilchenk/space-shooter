import { Container } from "pixi.js";

export class Entity {
  private view: Container;

  private isDead: boolean = false;

  constructor(view: Container) {
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
