import { Entity } from "./Entities/Entity";
import { Boss } from "./Entities/Boss/Boss";
import { Bullet } from "./Entities/Bullet/Bullet";

export class EntityManager {
  private entities: Entity[] = [];
  constructor() {}

  getEntities() {
    return this.entities;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  removeEntityById(id: string) {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }

  getBoss() {
    return this.entities.find((e) => e instanceof Boss);
  }

  getBullets() {
    return this.entities.filter((entity) => entity instanceof Bullet);
  }
}
