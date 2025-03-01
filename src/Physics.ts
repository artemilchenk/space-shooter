import { Entity } from "./Entities/Entity";
import { Hero } from "./Entities/Hero/Hero";
import { CanvasDimensions } from "./Constants";
import { b } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

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

  static checkRectangleCircleCollision(rect: Entity, circle: Entity) {
    const rectX = rect.x;
    const rectY = rect.y;
    const rectWidth = rect.width;
    const rectHeight = rect.height;

    const circleX = circle.x;
    const circleY = circle.y;
    const circleRadius = circle.width / 2;

    let closestX = Math.max(rectX, Math.min(circleX, rectX + rectWidth));
    let closestY = Math.max(rectY, Math.min(circleY, rectY + rectHeight));

    let distanceX = circleX - closestX;
    let distanceY = circleY - closestY;
    let distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared <= circleRadius * circleRadius;
  }

  static checkEntityStickToScreenBoundaries(heroEntity: Entity) {
    let entityWithinScreen: boolean = true;
    const canvasWidth = CanvasDimensions.width;
    const entityWidth = heroEntity.width;

    if (heroEntity.x + entityWidth >= canvasWidth) {
      heroEntity.x = canvasWidth - entityWidth;
      entityWithinScreen = false;
    }

    if (heroEntity.x <= 0) {
      heroEntity.x = 0;
      entityWithinScreen = false;
    }

    return entityWithinScreen;
  }
}
