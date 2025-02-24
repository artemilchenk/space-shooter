import { CanvasDimensions } from "../../Constants";
import { Physics } from "../../Physics";
import { Asteroid } from "./Asteriod";
import AsteroidFactory from "./AsteroidFactory";
import { Application, Renderer } from "pixi.js";
import { Entity } from "../Entity";

export class AsteroidService {
  private asteroids: Asteroid[] = [];
  private readonly asteroidFactory: AsteroidFactory;

  constructor(app: Application<Renderer>) {
    this.asteroidFactory = new AsteroidFactory(app);
  }

  checkAsteroidPosition(newAsteroidEntity: Entity) {
    return this.asteroids.some((asteroid) =>
      Physics.isCheckAABB(asteroid, newAsteroidEntity),
    );
  }

  generateAsteroids() {
    while (this.asteroids.length <= 7) {
      let asteroid: Asteroid | null = this.asteroidFactory.createAsteroid();
      asteroid.x = (Math.random() * (0.9 - 0.1) + 0.1) * CanvasDimensions.width;
      asteroid.y =
        (Math.random() * (0.5 - 0.1) + 0.1) * CanvasDimensions.height;

      if (this.checkAsteroidPosition(asteroid)) {
        asteroid.removeFromStage();
        asteroid = null;
        continue;
      }

      this.asteroids.push(asteroid);
    }
  }
}
