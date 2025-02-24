import { Container, Graphics } from "pixi.js";

export class BulletView extends Container {
  constructor() {
    super();

    const bulletShape = new Graphics();
    bulletShape.circle(0, 0, 5);
    bulletShape.fill({
      color: "darkblue",
    });
    bulletShape.stroke({
      color: "darkblue",
    });

    this.addChild(bulletShape);
  }
}
