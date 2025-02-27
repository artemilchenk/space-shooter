import { Application, Renderer } from "pixi.js";
import { AsteroidView } from "./AsteroidView";
import { Asteroid } from "./Asteriod";

export default class AsteroidFactory {
  private readonly app: Application<Renderer>;
  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createAsteroid() {
    const asteroidView = new AsteroidView();
    this.app.stage.addChild(asteroidView);
    return new Asteroid(asteroidView);
  }
}
