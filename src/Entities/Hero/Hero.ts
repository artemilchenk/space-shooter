import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";
import { KeyboardProcessor } from "../../KeyboardProcessor";
import { EmittiveEntity } from "../EmittiveEntity";
import { HeroData } from "../../Constants";

export class Hero extends EmittiveEntity {
  public readonly keyboardProcessor: KeyboardProcessor;

  public velocityX = 0;
  public count = 0;

  private directionRegister = {
    left: 0,
    right: 0,
  };

  constructor(view: Container, keyboardProcessor: KeyboardProcessor) {
    super(
      view,
      EntityTypes.HERO,
      -1,
      HeroData.shots,
      view.width / 2,
      -view.height / 4,
      10,
    );
    this.keyboardProcessor = keyboardProcessor;
  }

  public reset() {
    this.shots = 10;
    this.velocityX = 0;
    this.movement.x = 0;
  }

  public startLeftMove() {
    if (!this.isActive) return;

    this.directionRegister.left = -1;

    if (this.directionRegister.right > 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = -1;
  }

  public startRightMove() {
    if (!this.isActive) return;

    this.directionRegister.right = 1;

    if (this.directionRegister.left < 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = 1;
  }

  public stopLeftMove() {
    if (!this.isActive) return;

    this.directionRegister.left = 0;
    this.movement.x = this.directionRegister.right;
    this.count = 0;
  }

  public stopRightMove() {
    if (!this.isActive) return;

    this.directionRegister.right = 0;
    this.movement.x = this.directionRegister.left;
    this.count = 0;
  }

  public resetVelocity(): void {
    if (!this.isActive) return;

    this.velocityX = 0;
  }
}
