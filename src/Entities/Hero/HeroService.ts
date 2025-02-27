import { EntityService } from "../EntityService";
import { EntityManager } from "../../EntityManager";
import { Hero } from "./Hero";
import HeroFactory from "./HeroFactory";
import { KeyboardProcessor } from "../../KeyboardProcessor";
import { Application, Renderer } from "pixi.js";
import { CanvasDimensions } from "../../Constants";
import { EBoardRegisteredKeys } from "../../Enums";

export class HeroService {
  hero: Hero | undefined;
  heroFactory: HeroFactory;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly keyboardProcessor: KeyboardProcessor,
  ) {
    this.heroFactory = new HeroFactory(app);
  }
  update() {
    if (this.hero) {
      this.hero.x += Math.round(
        this.hero.movement.x * (this.hero.speed + this.hero.velocityX),
      );
      this.checkHeroPosition(this.hero);
      this.accelerateMovement(this.hero);
    }
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
    this.hero = this.heroFactory.createHero(this.keyboardProcessor);

    this.entityManager.addEntity(this.hero);
    return this.hero;
  }
}
