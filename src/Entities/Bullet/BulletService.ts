import { Bullet } from "./Bullet";
import { Entity } from "../Entity";
import { CanvasDimensions } from "../../Constants";
import { EntityManager } from "../../EntityManager";
import { EntityTypes } from "../../Enums";

export class BulletService {
  private readonly entityManager: EntityManager;
  private speed = 15;
  constructor() {
    this.entityManager = new EntityManager();
  }

  addBullet(bullet: Bullet) {
    this.entityManager.addEntity(bullet);
  }

  updateBullet() {
    this.entityManager.getEntities().forEach((bullet) => {
      bullet.y -= this.speed;
      this.checkBulletPosition(bullet);
    });

    this.entityManager.clearDeadEntity(EntityTypes.BULLET);
  }

  checkBulletPosition(bulletEntity: Entity) {
    if (bulletEntity.y <= 0 || bulletEntity.y >= CanvasDimensions.height) {
      bulletEntity.removeFromStage();
      bulletEntity.dead();
    }
  }
}
