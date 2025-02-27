import { Container, Graphics } from "pixi.js";
import { BulletDimensions } from "../../Constants";

export class BulletView extends Container {
  constructor() {
    super();

    const bulletShape = new Graphics();
    bulletShape.circle(0, 0, BulletDimensions.r);
    //bulletShape.pivot.set(-BulletDimensions.r, -BulletDimensions.r);

    bulletShape.fill({
      color: "darkblue",
    });

    this.addChild(bulletShape);
  }
}
