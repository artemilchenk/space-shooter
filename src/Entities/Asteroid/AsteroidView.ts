import { Container, Graphics } from "pixi.js";
import { AsteroidDimensions } from "../../Constants";

export class AsteroidView extends Container {
  constructor() {
    super();

    const asteroidShape = new Graphics();
    asteroidShape.circle(0, 0, AsteroidDimensions.r);
    //asteroidShape.pivot.set(-AsteroidDimensions.r, -AsteroidDimensions.r);
    asteroidShape.fill({
      color: "darkred",
    });

    this.addChild(asteroidShape);
  }
}
