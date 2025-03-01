import { Container, Graphics } from "pixi.js";
import { BulletDimensions } from "../../Constants";

export class BulletView extends Container {
  constructor(private color?: string | undefined) {
    super();

    const bulletShape = new Graphics();
    bulletShape.circle(0, 0, BulletDimensions.r);

    bulletShape.fill({
      color: this.color ?? "white",
    });

    this.addChild(bulletShape);
  }
}
