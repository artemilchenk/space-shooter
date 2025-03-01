import { Entity } from "./Entities/Entity";
import { Boss } from "./Entities/Boss/Boss";

export class EntityManager {
  private entities: Entity[] = [];
  constructor() {}

  getEntities() {
    return this.entities;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  removeEntity(entityToRemove: Entity) {
    const index = this.entities.findIndex(
      (entity) => entity.id === entityToRemove.id,
    );

    if (!index) return;

    entityToRemove.removeFromStage();
    entityToRemove.dead();
    entityToRemove.isActive = false;
    this.entities.splice(index, 1);
  }

  getBoss() {
    return this.entities.find((e) => e instanceof Boss);
  }
}
