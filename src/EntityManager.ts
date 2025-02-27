import { Entity } from "./Entities/Entity";

export class EntityManager {
  private entities: Entity[] = [];
  constructor() {}

  getEntities() {
    return this.entities;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  clearDeadEntity() {
    this.entities.map((entity) => {
      if (entity.isDeadState) {
        const index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
      }
    });
  }
}
