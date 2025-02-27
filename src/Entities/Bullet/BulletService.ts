import { CanvasDimensions } from "../../Constants";
import { EntityManager } from "../../EntityManager";
import { Physics } from "../../Physics";
import { Entity } from "../Entity";
import { Bullet } from "./Bullet";
import { Asteroid } from "../Asteroid/Asteriod";
import BulletFactory from "./BulletFactory";
import { EmittiveEntity } from "../EmittiveEntity";
import { Application, Renderer } from "pixi.js";

export class BulletService {
  bulletFactory: BulletFactory;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
    this.bulletFactory = new BulletFactory(app);
  }

  createBullet(ownerEntity: EmittiveEntity) {
    const bullet = this.bulletFactory.createBullet(
      ownerEntity.x + ownerEntity.emitiveShiftX,
      ownerEntity.y - ownerEntity.emitiveShiftY * ownerEntity.emitiveVectorY,
      ownerEntity.type,
    );

    this.entityManager.addEntity(bullet);
    ownerEntity.shot();
  }

  update() {
    this.entityManager.getEntities().forEach((entity) => {
      if (entity instanceof Bullet) {
        entity.move();
        this.checkPosition(entity);
        this.checkDamage(entity);
      }
    });
  }

  checkDamage(bullet: Bullet) {
    for (let entity of this.entityManager.getEntities()) {
      if (entity instanceof Asteroid) {
        if (Physics.checkCircleCollision(bullet, entity)) {
          bullet.removeFromStage();
          bullet.dead();
        }
      }
    }
  }

  checkPosition(bullet: Entity) {
    if (bullet.y <= 0 || bullet.y >= CanvasDimensions.height) {
      bullet.removeFromStage();
      bullet.dead();
    }
  }
}
