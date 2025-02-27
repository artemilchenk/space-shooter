import { EntityManager } from "./EntityManager";
import { Asteroid } from "./Entities/Asteroid/Asteriod";
import { Hero } from "./Entities/Hero/Hero";
import { Game } from "./Game";
import { EGameState } from "./Enums";

export class Statistics {
  public isAsteroids = true;
  public iHeroBullets = true;
  constructor(
    private readonly game: Game,
    private readonly entityManager: EntityManager,
    private readonly hero: Hero,
  ) {
    this.entityManager = entityManager;
  }

  update() {
    this.calculate();
  }

  checkAsteroids() {
    this.isAsteroids =
      this.entityManager
        .getEntities()
        .filter((entity) => entity instanceof Asteroid).length > 0;
  }

  checkHeroBullets() {
    this.iHeroBullets = this.hero.shots > 0;
  }

  check() {
    this.checkAsteroids();
    this.checkHeroBullets();
  }

  calculate() {
    if (
      (this.isAsteroids && !this.iHeroBullets) ||
      (!this.isAsteroids && !this.iHeroBullets)
    ) {
      this.game.state = EGameState.LOSE;
    }

    if (!this.isAsteroids && this.iHeroBullets) {
      if (this.game.level !== 2) {
        this.game.level = 2;
        this.hero.reset();
      }
    }

    this.check();
  }
}
