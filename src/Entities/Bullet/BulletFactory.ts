import { Application, Renderer } from "pixi.js";
import { BulletView } from "./BulletView";
import { Bullet } from "./Bullet";
import { EntityTypes } from "../../Enums";

export default class BulletFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createBullet(x: number, y: number, ownerType: EntityTypes): Bullet {
    const bulletView = new BulletView();
    bulletView.x = x;
    bulletView.y = y;
    this.app.stage.addChild(bulletView);
    return new Bullet(bulletView, ownerType);
  }
}
