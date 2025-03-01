import { Application, Renderer } from "pixi.js";
import { Hero } from "./Hero";
import { HeroView } from "./HeroView";
import { CanvasDimensions, HeroDimensions } from "../../Constants";
import { KeyboardProcessor } from "../../KeyboardProcessor";

export default class HeroFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createHero(keyboardProcessor: KeyboardProcessor) {
    const heroView = new HeroView();
    heroView.x = CanvasDimensions.width / 2 - HeroDimensions.width / 2;
    heroView.y = CanvasDimensions.height - HeroDimensions.height;
    this.app.stage.addChild(heroView);
    return new Hero(heroView, keyboardProcessor);
  }
}
