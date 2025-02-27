import { Application, Renderer } from "pixi.js";
import { Hero } from "./Hero";
import { HeroView } from "./HeroView";
import { CanvasDimensions } from "../../Constants";
import { KeyboardProcessor } from "../../KeyboardProcessor";

export default class HeroFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createHero(keyboardProcessor: KeyboardProcessor) {
    const heroView = new HeroView();
    heroView.x = CanvasDimensions.width / 2 - heroView.width / 2;
    heroView.y = CanvasDimensions.height - heroView.height;
    this.app.stage.addChild(heroView);
    return new Hero(heroView, keyboardProcessor);
  }
}
