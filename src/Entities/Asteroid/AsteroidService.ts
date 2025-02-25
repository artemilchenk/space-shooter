import { CanvasDimensions } from "../../Constants";
import { Physics } from "../../Physics";
import { Asteroid } from "./Asteriod";
import AsteroidFactory from "./AsteroidFactory";
import { Application, Renderer } from "pixi.js";
import { Entity } from "../Entity";
import { EntityManager } from "../../EntityManager";
import { EntityTypes } from "../../Enums";

export class AsteroidService {
  private readonly asteroidFactory: AsteroidFactory;
  private readonly entityManager: EntityManager;

  constructor(app: Application<Renderer>) {
    this.entityManager = new EntityManager();
    this.asteroidFactory = new AsteroidFactory(app);
  }

  checkAsteroidPosition(newAsteroidEntity: Entity) {
    return this.entityManager
      .getEntities()
      .some((asteroid) => Physics.isCheckAABB(asteroid, newAsteroidEntity));
  }

  asteroidsIsSet() {
    return (
      this.entityManager
        .getEntities()
        .filter((entity) => entity.type === EntityTypes.ASTEROID).length >= 8
    );
  }

  generateAsteroids() {
    while (!this.asteroidsIsSet()) {
      let asteroid: Asteroid | null = this.asteroidFactory.createAsteroid();
      asteroid.x = (Math.random() * (0.9 - 0.1) + 0.1) * CanvasDimensions.width;
      asteroid.y =
        (Math.random() * (0.5 - 0.1) + 0.1) * CanvasDimensions.height;

      if (this.checkAsteroidPosition(asteroid)) {
        asteroid.removeFromStage();
        asteroid = null;
        continue;
      }

      this.entityManager.addEntity(asteroid);
    }
  }
}
