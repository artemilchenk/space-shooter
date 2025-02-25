import { Application, Renderer } from "pixi.js";
import { Hero } from "./Entities/Hero/Hero";
import { KeyboardProcessor } from "./KeyboardProcessor";
import { EBoardRegisteredKeys, EntityTypes } from "./Enums";
import { AsteroidService } from "./Entities/Asteroid/AsteroidService";
import HeroFactory from "./Entities/Hero/HeroFactory";
import BulletFactory from "./Entities/Bullet/BulletFactory";
import { BulletService } from "./Entities/Bullet/BulletService";
import { EntityManager } from "./EntityManager";

export class Game {
  public keyboardProcessor: KeyboardProcessor;
  private readonly app: Application<Renderer>;
  private readonly hero: Hero;
  private readonly bulletFactory: BulletFactory;
  private readonly bulletService: BulletService;
  private readonly entityManager: EntityManager;

  constructor(app: Application<Renderer>) {
    this.entityManager = new EntityManager();
    this.app = app;
    this.keyboardProcessor = new KeyboardProcessor(this);

    const asteroidService = new AsteroidService(app);
    asteroidService.generateAsteroids();

    const heroFactory = new HeroFactory(app);
    this.hero = heroFactory.createHero();

    this.bulletFactory = new BulletFactory(app);
    this.bulletService = new BulletService();

    this.setKeys();
  }

  update() {
    this.hero.update();
    this.bulletService.updateBullet();
  }

  setKeys() {
    const arrowLeft = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.LEFT,
    );
    arrowLeft.executeDown = () => {
      this.hero.startLeftMove();
    };

    arrowLeft.executeUp = () => {
      this.hero.stopLeftMove();
    };

    const arrowRight = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.RIGHT,
    );
    arrowRight.executeDown = () => {
      this.hero.startRightMove();
    };

    arrowRight.executeUp = () => {
      this.hero.stopRightMove();
    };

    const space = this.keyboardProcessor.getButton(EBoardRegisteredKeys.SPACE);
    space.executeDown = () => {};

    space.executeUp = () => {
      const bullet = this.bulletFactory.createBullet(
        EntityTypes.HERO,
        this.hero.x + this.hero.width / 2,
        this.hero.y - this.hero.height / 10,
      );
      this.bulletService.addBullet(bullet);
    };
  }
}
