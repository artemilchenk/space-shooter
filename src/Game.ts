import { Application, Renderer } from "pixi.js";
import { Hero } from "./Entities/Hero/Hero";
import { KeyboardProcessor } from "./KeyboardProcessor";
import { EBoardRegisteredKeys } from "./Enums";
import { AsteroidService } from "./Entities/Asteroid/AsteroidService";
import { HeroService } from "./Entities/Hero/HeroService";
import HeroFactory from "./Entities/Hero/HeroFactory";

export class Game {
  public keyboardProcessor: KeyboardProcessor;
  private readonly app: Application<Renderer>;
  private readonly hero: Hero;

  constructor(app: Application<Renderer>) {
    this.app = app;
    this.keyboardProcessor = new KeyboardProcessor(this);

    const asteroidService = new AsteroidService(app);
    asteroidService.generateAsteroids();

    const heroFactory = new HeroFactory(app);
    this.hero = heroFactory.createHero();

    this.setKeys();
  }

  update() {
    this.hero.update();
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
  }
}
