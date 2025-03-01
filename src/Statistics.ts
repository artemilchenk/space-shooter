import { EntityManager } from "./EntityManager";
import { Asteroid } from "./Entities/Asteroid/Asteriod";
import { Hero } from "./Entities/Hero/Hero";
import { Game } from "./Game";
import { Service } from "./Service";
import { Bullet } from "./Entities/Bullet/Bullet";
import { EGameState, EntityTypes } from "./Enums";
import { Boss } from "./Entities/Boss/Boss";

export class Statistics implements Service {
  public isAsteroids = true;
  public isHeroBullets = true;
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
    this.isHeroBullets =
      this.hero.shots > 0 ||
      !!this.entityManager
        .getEntities()
        .find((e) => e instanceof Bullet && e.ownerType === EntityTypes.HERO);
  }

  check() {
    this.checkAsteroids();
    this.checkHeroBullets();
  }

  calculate() {
    if (this.hero.isDead) {
      console.log("1");
      this.game.lose();
    }

    if (this.game.level === 1) {
      if (this.isAsteroids && !this.isHeroBullets) {
        console.log("2");
        this.game.lose();
      }

      if (!this.isAsteroids && this.isHeroBullets) {
        this.game.goToNextLevel();
      }
    }

    if (this.game.level === 2) {
      if (!this.isHeroBullets && this.entityManager.getBoss()) {
        console.log("3");
        this.game.lose();
      }

      if (this.entityManager.getBoss()?.isDead) this.game.win();
    }

    this.check();
  }
}
