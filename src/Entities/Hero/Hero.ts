import { Container } from "pixi.js";
import { EBoardRegisteredKeys, EntityTypes } from "../../Enums";
import { KeyboardProcessor } from "../../KeyboardProcessor";
import { EmittiveEntity } from "../EmittiveEntity";
import { CanvasDimensions } from "../../Constants";

export class Hero extends EmittiveEntity {
  public readonly keyboardProcessor: KeyboardProcessor;

  public velocityX = 0;
  public speed = 10;

  public count = 0;

  public movement = {
    x: 0,
  };

  private directionRegister = {
    left: 0,
    right: 0,
  };

  constructor(view: Container, keyboardProcessor: KeyboardProcessor) {
    super(view, EntityTypes.HERO, 1, 10, view.width / 2, view.height / 4);
    this.keyboardProcessor = keyboardProcessor;
  }

  update() {
    this.x += Math.round(this.speed + this.velocityX * this.movement.x);

    this.accelerateMovement(this);
    this.checkHeroPosition(this);
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

  reset() {
    this.shots = 10;
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
    this.count = 0;
  }

  stopRightMove() {
    this.directionRegister.right = 0;
    this.movement.x = this.directionRegister.left;
    this.count = 0;
  }

  resetVelocity(): void {
    this.velocityX = 0;
  }
}
