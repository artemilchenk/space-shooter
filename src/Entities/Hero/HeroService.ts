import { Entity } from "../Entity";
import { CanvasDimensions } from "../../Constants";

export class HeroService {
  constructor() {}

  checkHeroPosition(heroEntity: Entity) {
    const canvasWidth = CanvasDimensions.width;
    const entityWidth = heroEntity.width;

    if (heroEntity.x + entityWidth >= canvasWidth) {
      heroEntity.x = canvasWidth - entityWidth;
    }

    if (heroEntity.x <= 0) {
      heroEntity.x = 0;
    }
  }
}
