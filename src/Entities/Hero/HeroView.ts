import { Container, Graphics } from "pixi.js";
import { HeroDimensions } from "../../Constants";

export class HeroView extends Container {
  constructor() {
    super();

    const heroShape = new Graphics();
    heroShape.rect(0, 0, HeroDimensions.width, HeroDimensions.height);
    heroShape.fill({
      color: "darkgreen",
    });

    this.addChild(heroShape);
  }
}
