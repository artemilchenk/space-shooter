import { Entity } from "./Entities/Entity";
import { EntityTypes } from "./Enums";
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

  getBoss() {
    return this.entities.find((e) => e instanceof Boss);
  }
}
