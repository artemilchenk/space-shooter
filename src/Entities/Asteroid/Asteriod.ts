import { Entity } from "../Entity";
import { Container } from "pixi.js";
import { EntityTypes } from "../../Enums";

export class Asteroid extends Entity {
  constructor(view: Container) {
    super(view, EntityTypes.ASTEROID);
  }
}
