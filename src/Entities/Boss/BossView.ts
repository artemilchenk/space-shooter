import { Container, Graphics } from "pixi.js";
import { BossDimensions } from "../../Constants";

export class BossView extends Container {
  constructor() {
    super();

    const bossShape = new Graphics();
    bossShape.rect(0, 0, BossDimensions.width, BossDimensions.height);
    bossShape.fill({
      color: "darkviolet",
    });

    this.addChild(bossShape);
  }
}
