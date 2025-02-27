import { EntityService } from "../EntityService";
import { EntityManager } from "../../EntityManager";
import { Hero } from "./Hero";
import HeroFactory from "./HeroFactory";
import { KeyboardProcessor } from "../../KeyboardProcessor";
import { Application, Renderer } from "pixi.js";
import { Entity } from "../Entity";
import { CanvasDimensions } from "../../Constants";
import { EBoardRegisteredKeys } from "../../Enums";

export class HeroService implements EntityService {
  heroFactory: HeroFactory;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly keyboardProcessor: KeyboardProcessor,
  ) {
    this.heroFactory = new HeroFactory(app);
  }
  update() {
    this.entityManager.getEntities().forEach((entity) => {
      if (entity instanceof Hero) {
        entity.x += Math.round(
          entity.x * entity.speed + entity.velocityX * entity.movement.x,
        );

        this.accelerateMovement(entity);
        this.checkHeroPosition(entity);
      }
    });
  }

  accelerateMovement(entity: Hero) {
    if (
      this.keyboardProcessor.getButton(EBoardRegisteredKeys.RIGHT).isDown ||
      this.keyboardProcessor.getButton(EBoardRegisteredKeys.LEFT).isDown
    ) {
      entity.count++;

      if (entity.count >= 30) entity.velocityX += 0.5;
    }
  }

  checkHeroPosition(heroEntity: Hero) {
    const canvasWidth = CanvasDimensions.width;
    const entityWidth = heroEntity.width;

    if (heroEntity.x + entityWidth >= canvasWidth) {
      heroEntity.x = canvasWidth - entityWidth;
    }

    if (heroEntity.x <= 0) {
      heroEntity.x = 0;
    }
  }

  createHero() {
    const heroEntity = this.heroFactory.createHero(this.keyboardProcessor);
    this.entityManager.addEntity(heroEntity);
    return heroEntity;
  }
}
