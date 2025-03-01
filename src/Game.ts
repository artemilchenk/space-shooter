import { Application, Renderer } from "pixi.js";
import { Hero } from "./Entities/Hero/Hero";
import { KeyboardProcessor } from "./KeyboardProcessor";
import { EBoardRegisteredKeys, EGameState } from "./Enums";
import { AsteroidService } from "./Entities/Asteroid/AsteroidService";
import { BulletService } from "./Entities/Bullet/BulletService";
import { EntityManager } from "./EntityManager";
import { Statistics } from "./Statistics";
import { HeroService } from "./Entities/Hero/HeroService";
import { TimerService } from "./Timer/TimerService";
import { ScreenDashboard } from "./ScreenDashboard";
import { BossService } from "./Entities/Boss/BossService";
import { Boss } from "./Entities/Boss/Boss";

export class Game {
  public state: EGameState;
  public level: 1 | 2 = 1;
  private readonly hero: Hero;
  private boss: Boss | undefined;
  private readonly app: Application<Renderer>;
  private readonly statistics: Statistics;
  public readonly keyboardProcessor: KeyboardProcessor;
  private readonly entityManager: EntityManager;
  private readonly bulletService: BulletService;
  private readonly asteroidService: AsteroidService;
  private readonly heroService: HeroService;
  private readonly bossService: BossService;
  private readonly timerService: TimerService;
  private readonly screenDashboard: ScreenDashboard;

  constructor(app: Application<Renderer>) {
    this.state = EGameState.PLAYING;
    this.app = app;

    this.timerService = new TimerService();
    this.keyboardProcessor = new KeyboardProcessor(this);
    this.entityManager = new EntityManager();

    this.bulletService = new BulletService(app, this.entityManager);
    this.heroService = new HeroService(
      app,
      this.entityManager,
      this.keyboardProcessor,
      this.bulletService,
    );
    this.bossService = new BossService(
      app,
      this.entityManager,
      this.bulletService,
      this.timerService,
    );
    this.asteroidService = new AsteroidService(app, this.entityManager);

    this.hero = this.heroService.createHero();
    this.asteroidService.generateAsteroids();

    this.screenDashboard = new ScreenDashboard(app);
    this.statistics = new Statistics(this, this.entityManager, this.hero);
    this.screenDashboard.addBulletTextEntity(this.hero.shots);

    this.setKeys();
  }

  update() {
    this.heroService.update();
    this.bulletService.update();
    this.asteroidService.update();
    this.bossService.update();
    this.statistics.update();
    this.screenDashboard.update();
    this.timerService.update();

    this.clearDeadEntity();
    this.watch();
  }

  clearDeadEntity() {
    this.entityManager.getEntities().forEach((entity, index) => {
      if (entity.isDead) {
        entity.removeFromStage();
        this.entityManager.getEntities().splice(index, 1);
      }
    });
  }

  lose(): void {
    this.state = EGameState.LOSE;
    this.screenDashboard.addLevelStageTextEntity("YOU LOSE");
  }

  win(): void {
    this.state = EGameState.WIN;
    this.screenDashboard.addLevelStageTextEntity("YOU WIN");
  }

  watch() {
    if (this.state === EGameState.WIN || this.state === EGameState.LOSE) {
      this.freezeEntity();
    }
  }

  freezeEntity() {
    this.entityManager.getEntities().forEach((entity, index) => {
      entity.isActive = false;
    });
  }

  goToNextLevel() {
    this.hero.isActive = false;
    this.level = 2;
    this.state = EGameState.PENDING;
    this.screenDashboard.addLevelStageTextEntity("LEVEL 2");
    this.hero.reset();

    this.timerService.doAfter(() => {
      this.hero.isActive = true;
      this.screenDashboard.addBulletTextEntity(this.hero.shots);
      this.state = EGameState.PLAYING;
      this.screenDashboard.removeLevelStageTextEntity();
      this.bossService.createBoss();
    }, 180);
  }

  setKeys() {
    const arrowLeft = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.LEFT,
    );
    arrowLeft.executeDown = () => {
      this.hero.startLeftMove();
    };

    arrowLeft.executeUp = () => {
      this.hero.resetVelocity();
      this.hero.stopLeftMove();
    };

    const arrowRight = this.keyboardProcessor.getButton(
      EBoardRegisteredKeys.RIGHT,
    );
    arrowRight.executeDown = () => {
      this.hero.startRightMove();
    };

    arrowRight.executeUp = () => {
      this.hero.resetVelocity();
      this.hero.stopRightMove();
    };

    const space = this.keyboardProcessor.getButton(EBoardRegisteredKeys.SPACE);

    space.executeUp = () => {
      this.heroService.shot();
      this.screenDashboard.addBulletTextEntity(this.hero.shots);
    };
  }
}
