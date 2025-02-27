import { Hero } from "./Entities/Hero/Hero";
import { Application, Renderer } from "pixi.js";

export class ScreenDashboard {
  constructor(
    private readonly app: Application<Renderer>,
    private readonly hero: Hero,
  ) {}
}
