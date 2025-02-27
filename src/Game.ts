import { Application, log2, Renderer } from "pixi.js";
import { Hero } from "./Entities/Hero/Hero";
import { KeyboardProcessor } from "./KeyboardProcessor";
import { EBoardRegisteredKeys, EGameState } from "./Enums";
import { AsteroidService } from "./Entities/Asteroid/AsteroidService";
import { BulletService } from "./Entities/Bullet/BulletService";
import { EntityManager } from "./EntityManager";
import { Statistics } from "./Statistics";
import { HeroService } from "./Entities/Hero/HeroService";
import { TimerUnit } from "./Timer/TimerUnit";
import { TimerService } from "./Timer/TimerService";

export class Game {
  public state: EGameState;
  public level: 1 | 2 = 1;
  private readonly app: Application<Renderer>;
  private readonly statistics: Statistics;
  public readonly keyboardProcessor: KeyboardProcessor;
  private readonly entityManager: EntityManager;
  private readonly hero: Hero;
  private readonly bulletService: BulletService;
  private readonly asteroidService: AsteroidService;
  private readonly heroService: HeroService;
  private readonly timerService: TimerService;

  constructor(app: Application<Renderer>) {
    this.state = EGameState.PLAYING;
    this.app = app;

    this.timerService = new TimerService();

    this.keyboardProcessor = new KeyboardProcessor(this);

    this.entityManager = new EntityManager();

    this.heroService = new HeroService(
      app,
      this.entityManager,
      this.keyboardProcessor,
    );
    this.hero = this.heroService.createHero();

    this.bulletService = new BulletService(app, this.entityManager);
    this.asteroidService = new AsteroidService(app, this.entityManager);
    this.asteroidService.generateAsteroids();

    this.statistics = new Statistics(this, this.entityManager, this.hero);

    this.setKeys();
  }

  update() {
    this.heroService.update();
    this.bulletService.update();
    this.asteroidService.update();
    this.entityManager.clearDeadEntity();
    this.statistics.update();

    this.timerService.update();
  }

  setKeys() {
    const arrowLeft = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.LEFT,
    );
    arrowLeft.executeDown = () => {
      if (this.state === EGameState.LOSE) return;
      this.hero.startLeftMove();
    };

    arrowLeft.executeUp = () => {
      if (this.state === EGameState.LOSE) return;
      this.hero.resetVelocity();
      this.hero.stopLeftMove();
    };

    const arrowRight = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.RIGHT,
    );
    arrowRight.executeDown = () => {
      if (this.state === EGameState.LOSE) return;
      this.hero.startRightMove();
    };

    arrowRight.executeUp = () => {
      if (this.state === EGameState.LOSE) return;
      this.hero.resetVelocity();
      this.hero.stopRightMove();
    };

    const space = this.keyboardProcessor.getButton(EBoardRegisteredKeys.SPACE);

    space.executeUp = () => {
      if (this.state === EGameState.LOSE) return;
      this.bulletService.createBullet(this.hero);
    };
  }
}
