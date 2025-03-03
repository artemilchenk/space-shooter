import { EmittiveEntity } from "../EmittiveEntity";
import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";
import { Physics } from "../../Physics";
import { BossData } from "../../Constants";

export class Boss extends EmittiveEntity {
  health: number = BossData.health;
  constructor(view: Container) {
    super(
      view,
      EntityTypes.BOSS,
      1,
      10,
      view.width / 2,
      view.height + view.height / 4,
      10,
    );
  }

  damage() {
    this.health--;
  }

  move() {
    if (!Physics.checkEntityStickToScreenBoundaries(this)) {
      this.movement.x = -this.movement.x;
    }

    this.x += this.speed * this.movement.x;
  }
}
