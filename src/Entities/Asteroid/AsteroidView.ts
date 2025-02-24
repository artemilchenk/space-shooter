import { Container, Graphics } from "pixi.js";

export class AsteroidView extends Container {
  constructor() {
    super();

    const asteroidShape = new Graphics();
    asteroidShape.circle(0, 0, 50);
    asteroidShape.fill({
      color: "darkred",
    });
    asteroidShape.stroke({
      color: "darkred",
    });

    this.addChild(asteroidShape);
  }
}
