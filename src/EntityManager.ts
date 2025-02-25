import { Entity } from "./Entities/Entity";
import { EntityTypes } from "./Enums";

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
    const entity = this.entities.find((entity) => entity.id === id);
    if (entity) {
      const index = this.entities.indexOf(entity);
      this.entities.splice(index, 1);
    }
  }

  clearDeadEntity(type: EntityTypes) {
    this.entities.forEach((bullet) => {
      if (bullet.isDeadState) this.removeEntityById(bullet.id);
    });
  }
}
