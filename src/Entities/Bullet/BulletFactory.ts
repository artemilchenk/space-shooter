import { Application, Renderer } from "pixi.js";
import { BulletView } from "./BulletView";
import { Bullet } from "./Bullet";
import { TBulletType } from "../../Types";

export default class BulletFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createBullet(type: TBulletType, x: number, y: number): Bullet {
    const bulletView = new BulletView();
    bulletView.x = x;
    bulletView.y = y;
    this.app.stage.addChild(bulletView);
    return new Bullet(bulletView, type);
  }
}
