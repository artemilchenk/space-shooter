import { CanvasDimensions } from "../../Constants";
import { EntityManager } from "../../EntityManager";
import { Entity } from "../Entity";
import { Bullet } from "./Bullet";
import BulletFactory from "./BulletFactory";
import { EmittiveEntity } from "../EmittiveEntity";
import { Application, Renderer } from "pixi.js";
import { Service } from "../../Service";

export class BulletService implements Service {
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly bulletFactory: BulletFactory = new BulletFactory(app),
  ) {}

  createBullet(ownerEntity: EmittiveEntity, color?: string | undefined) {
    const bullet = this.bulletFactory.createBullet(
      ownerEntity.x + ownerEntity.emitiveShiftX,
      ownerEntity.y + ownerEntity.emitiveShiftY,
      ownerEntity.type,
      ownerEntity.emitiveVectorY,
      color,
    );
    this.entityManager.addEntity(bullet);
    ownerEntity.shot();
  }

  update() {
    this.entityManager.getEntities().forEach((entity) => {
      if (entity instanceof Bullet) {
        entity.move();
        this.checkPosition(entity);
      }
    });
  }

  checkPosition(bullet: Entity) {
    if (bullet.y <= 0 || bullet.y >= CanvasDimensions.height) {
      this.entityManager.removeEntity(bullet);
    }
  }
}
