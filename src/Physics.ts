import { Entity } from "./Entities/Entity";
import { CanvasDimensions } from "./Constants";

export class Physics {
  static isCheckAABB(entity: Entity, area: Entity) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
