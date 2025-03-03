import { Application, Renderer } from "pixi.js";
import { Hero } from "./Entities/Hero/Hero";
import { KeyboardProcessor } from "./KeyboardProcessor";
import { EBoardRegisteredKeys, EPlayState, ETextNames } from "./Enums";
import { AsteroidService } from "./Entities/Asteroid/AsteroidService";
import { BulletService } from "./Entities/Bullet/BulletService";
import { EntityManager } from "./EntityManager";
import { Statistics } from "./Statistics";
import { HeroService } from "./Entities/Hero/HeroService";
import { TimerService } from "./Timer/TimerService";
import { ScreenDashboard } from "./ScreenDashboard";
import { BossService } from "./Entities/Boss/BossService";
import { Boss } from "./Entities/Boss/Boss";
import { BossData, HeroData } from "./Constants";

export class Game {
  private _playState: {
    prev: EPlayState;
    current: EPlayState;
  } = {
    prev: EPlayState.PLAYING,
    current: EPlayState.PLAYING,
  };
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
    this.playState = EPlayState.PLAYING;
    this.app = app;

    this.timerService = new TimerService();
    this.keyboardProcessor = new KeyboardProcessor(this);
    this.entityManager = new EntityManager();

    this.bulletService = new BulletService(app, this.entityManager);

    this.screenDashboard = new ScreenDashboard(app);
    this.screenDashboard.addBulletCountText(`Bullets: ${HeroData.shots}`);
    this.screenDashboard.addLevelBoardText(`Level ${HeroData.level}`);
    this.heroService = new HeroService(
      app,
      this.entityManager,
      this.keyboardProcessor,
      this.bulletService,
      this.screenDashboard,
    );
    this.bossService = new BossService(
      app,
      this.entityManager,
      this.bulletService,
      this.timerService,
      this.screenDashboard,
    );
    this.asteroidService = new AsteroidService(app, this.entityManager);

    this.hero = this.heroService.createHero();
    this.asteroidService.generateAsteroids();

    this.statistics = new Statistics(this, this.entityManager, this.hero);

    this.setKeys();
  }

  set playState(value: EPlayState) {
    this._playState.prev = this._playState.current;
    this._playState.current = value;
  }

  get playPrevState() {
    return this._playState.prev;
  }

  get playCurrentState() {
    return this._playState.current;
  }

  update() {
    this.heroService.update();
    this.bulletService.update();
    this.asteroidService.update();
    this.bossService.update();
    this.statistics.update();
    this.screenDashboard.update();
    this.timerService.update();

    this.watchPlayingState();
  }

  lose(): void {
    this.playState = EPlayState.LOSE;
  }

  win(): void {
    this.playState = EPlayState.WIN;
  }

  watchPlayingState() {
    if (this.entityManager.getBullets().length <= 0) {
      if (
        this.playCurrentState === EPlayState.LOSE ||
        (this.playCurrentState === EPlayState.WIN &&
          this.playPrevState === EPlayState.LOSE)
      ) {
        this.screenDashboard.addLevelStageTextEntity("YOU LOSE");
      } else if (this.playCurrentState === EPlayState.WIN)
        this.screenDashboard.addLevelStageTextEntity("YOU WIN");
    }

    if (this.playCurrentState !== EPlayState.PLAYING) {
      this.freezeEntity();
    } else {
      this.unFreezeEntity();
    }
  }

  freezeEntity() {
    this.entityManager.getEntities().forEach((entity, index) => {
      entity.isActive = false;
    });
  }

  unFreezeEntity() {
    this.entityManager.getEntities().forEach((entity, index) => {
      entity.isActive = true;
    });
  }

  goToNextLevel() {
    this.playState = EPlayState.PENDING;
    this.level = 2;
    this.screenDashboard.addLevelStageTextEntity("LEVEL 2");
    this.screenDashboard.addLevelBoardText("LEVEL 2");
    this.hero.reset();

    this.timerService.doAfter(() => {
      this.playState = EPlayState.PLAYING;
      this.screenDashboard.addBulletCountText(`Bullets: ${this.hero.shots}`);
      this.screenDashboard.removeLevelStageTextEntity();
      this.bossService.createBoss();
      this.screenDashboard.addBosHealthText(`Health ${BossData.health}`);
    }, 120);
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
    };
  }
}
