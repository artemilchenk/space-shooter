import { Entity } from "./Entities/Entity";

export class Physics {
  static isCheckAABB(entity: Entity, area: Entity) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }

  static checkCircleCollision(circle1: Entity, circle2: Entity) {
    const dx = Math.abs(circle1.x - circle2.x);
    const dy = Math.abs(circle1.y - circle2.y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    const combinedRadius = circle1.width / 2 + circle2.width / 2;

    return distance < combinedRadius - 5;
  }
}
