import { CanvasDimensions } from "../../Constants";
import { Physics } from "../../Physics";
import { Asteroid } from "./Asteriod";
import AsteroidFactory from "./AsteroidFactory";
import { Application, Renderer } from "pixi.js";
import { Entity } from "../Entity";
import { EntityManager } from "../../EntityManager";
import { EntityTypes } from "../../Enums";
import { Bullet } from "../Bullet/Bullet";
import { Service } from "../../Service";

export class AsteroidService implements Service {
  private readonly asteroidFactory: AsteroidFactory;
  private readonly entityManager: EntityManager;

  constructor(app: Application<Renderer>, entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.asteroidFactory = new AsteroidFactory(app);
  }

  update() {
    this.entityManager.getEntities().forEach((entity) => {
      if (entity instanceof Asteroid) {
        this.checkDamage(entity);
      }
    });
  }

  checkDamage(asteroid: Asteroid) {
    for (let entity of this.entityManager.getEntities()) {
      if (entity instanceof Bullet) {
        if (Physics.checkCircleCollision(asteroid, entity)) {
          entity.removeFromStage();
          this.entityManager.removeEntityById(entity.id);

          asteroid.removeFromStage();
          this.entityManager.removeEntityById(asteroid.id);
        }
      }
    }
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
      asteroid.x =
        (Math.random() * (0.95 - 0.05) + 0.05) * CanvasDimensions.width;
      asteroid.y =
        (Math.random() * (0.5 - 0.08) + 0.08) * CanvasDimensions.height;

      if (this.checkAsteroidPosition(asteroid)) {
        asteroid.removeFromStage();
        asteroid = null;
        continue;
      }

      this.entityManager.addEntity(asteroid);
    }
  }
}
