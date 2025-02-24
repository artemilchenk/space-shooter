import { Entity } from "../Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";
import { HeroService } from "./HeroService";

export class Hero extends Entity {
  private readonly type = EntityTypes.HERO;
  private velocityX = 0;
  private speed = 10;
  private readonly heroService: HeroService;

  private movement = {
    x: 0,
  };

  private directionRegister = {
    left: 0,
    right: 0,
  };

  constructor(view: Container) {
    super(view);
    this.heroService = new HeroService();
  }

  update() {
    this.velocityX = this.movement.x * this.speed;
    this.x += this.velocityX;

    this.heroService.checkHeroPosition(this);
  }

  startLeftMove() {
    this.directionRegister.left = -1;

    if (this.directionRegister.right > 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = -1;
  }

  startRightMove() {
    this.directionRegister.right = 1;

    if (this.directionRegister.left < 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = 1;
  }

  stopLeftMove() {
    this.directionRegister.left = 0;
    this.movement.x = this.directionRegister.right;
  }

  stopRightMove() {
    this.directionRegister.right = 0;
    this.movement.x = this.directionRegister.left;
  }
}
