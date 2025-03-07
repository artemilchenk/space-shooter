import { EntityManager } from "../../EntityManager";
import { Hero } from "./Hero";
import HeroFactory from "./HeroFactory";
import { KeyboardProcessor } from "../../KeyboardProcessor";
import { Application, Renderer } from "pixi.js";
import { EBoardRegisteredKeys, EntityTypes } from "../../Enums";
import { Physics } from "../../Physics";
import { BulletService } from "../Bullet/BulletService";
import { EmmitiveService } from "../EmmitiveService";
import { Bullet } from "../Bullet/Bullet";
import { ScreenDashboard } from "../../ScreenDashboard";

export class HeroService extends EmmitiveService {
  hero: Hero | undefined;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly keyboardProcessor: KeyboardProcessor,
    private readonly bulletService: BulletService,
    private readonly screenDashboard: ScreenDashboard,
    private readonly heroFactory: HeroFactory = new HeroFactory(app),
  ) {
    super();
  }

  update() {
    if (!this.hero?.isActive) return;

    this.hero.x += Math.round(
      this.hero.movement.x * (this.hero.speed + this.hero.velocityX),
    );
    Physics.checkEntityStickToScreenBoundaries(this.hero);
    this.accelerateMovement(this.hero);

    this.checkDamage();
  }

  checkDamage() {
    for (let entity of this.entityManager.getEntities()) {
      if (entity instanceof Bullet && entity.ownerType === EntityTypes.BOSS) {
        if (
          this.hero?.isActive &&
          Physics.checkRectangleCircleCollision(this.hero, entity)
        ) {
          entity.removeFromStage();
          this.entityManager.removeEntityById(entity.id);

          this.hero.dead();
          this.hero.removeFromStage();
          this.entityManager.removeEntityById(entity.id);
        }
      }
    }
  }

  createHero() {
    this.hero = this.heroFactory.createHero(this.keyboardProcessor);

    this.entityManager.addEntity(this.hero);
    return this.hero;
  }

  shot() {
    if (!this.hero?.isActive) return;

    if (this.hero && this.hero.shots > 0) {
      this.bulletService.createBullet(this.hero, "darkblue");
      this.hero.shot();
      this.screenDashboard.addBulletCountText(`Bullets: ${this.hero.shots}`);
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
}
