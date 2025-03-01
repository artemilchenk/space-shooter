import { Application, Renderer } from "pixi.js";
import { CanvasDimensions } from "../../Constants";
import { BossView } from "./BossView";
import { Boss } from "./Boss";

export default class BossFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createBoss() {
    const bossView = new BossView();
    bossView.x = CanvasDimensions.width / 2 - bossView.width / 2;
    this.app.stage.addChild(bossView);
    return new Boss(bossView);
  }
}
