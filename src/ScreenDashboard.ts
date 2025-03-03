import { Application, Renderer, Text, TextStyle } from "pixi.js";
import { ETextEntity, ETextNames } from "./Enums";
import { Service } from "./Service";
import { CanvasDimensions } from "./Constants";
import { TextEntity } from "./Types";

export class ScreenDashboard implements Service {
  textEntities: TextEntity[] = [];
  constructor(private readonly app: Application<Renderer>) {}

  update() {
    this.clearDoneText();
  }

  private addBoardTextEntity(
    textEntity: Text,
    text: string,
    name: ETextNames,
  ): void {
    this.textEntities.push({
      id: Date.now().toString(),
      textView: textEntity,
      type: ETextEntity.BOARD,
      name: name,
      text: text,
      isDone: false,
    });
  }

  private addStageTextEntity(
    textEntity: Text,
    text: string,
    name: ETextNames,
  ): void {
    this.textEntities.push({
      id: Date.now().toString(),
      textView: textEntity,
      type: ETextEntity.STAGE,
      name: name,
      text: text,
      isDone: false,
    });
  }

  removeOldBoardText(name: ETextNames) {
    this.textEntities.forEach((entity) => {
      if (entity.type === ETextEntity.BOARD && entity.name === name) {
        entity.isDone = true;
      }
    });
  }

  addBosHealthText(text: string): void {
    this.removeOldBoardText(ETextNames.BOSS_HEALTH_COUNT);

    const textStyle = new TextStyle({
      fill: "white",
      fontSize: 32,
      fontFamily: "Arial",
    });

    const bossText = new Text({
      text: text,
      style: textStyle,
    });

    this.app.stage.addChild(bossText);

    this.addBoardTextEntity(bossText, text, ETextNames.BOSS_HEALTH_COUNT);
  }

  addBulletCountText(text: string) {
    this.removeOldBoardText(ETextNames.BULLET_COUNT);

    const textStyle = new TextStyle({
      fill: "white",
      fontSize: 32,
      fontFamily: "Arial",
    });

    const bulletText = new Text({
      text: text,
      style: textStyle,
    });

    bulletText.y = CanvasDimensions.height - bulletText.height;

    this.app.stage.addChild(bulletText);

    this.addBoardTextEntity(bulletText, text, ETextNames.BULLET_COUNT);
  }

  addLevelBoardText(text: string) {
    this.removeOldBoardText(ETextNames.LEVEL_COUNT);

    const textStyle = new TextStyle({
      fill: "white",
      fontSize: 32,
      fontFamily: "Arial",
    });

    const levelText = new Text({
      text: text,
      style: textStyle,
    });

    levelText.x = CanvasDimensions.width - levelText.width;
    levelText.y = CanvasDimensions.height - levelText.height;

    this.app.stage.addChild(levelText);

    this.addBoardTextEntity(levelText, text, ETextNames.LEVEL_COUNT);
  }

  addLevelStageTextEntity(text: string): void {
    const stageTextStyle = new TextStyle({
      fill: "white",
      fontSize: 32,
      fontFamily: "Arial",
    });

    const stageText = new Text({
      text: text,
      style: stageTextStyle,
    });

    stageText.x = this.app.canvas.width / 2 - stageText.width / 2;
    stageText.y = this.app.canvas.height / 2 - stageText.height / 2;

    this.app.stage.addChild(stageText);

    this.addStageTextEntity(stageText, text, ETextNames.LEVEL_COUNT);
  }

  removeLevelStageTextEntity(): void {
    this.textEntities.forEach((entity) => {
      if (entity.type === ETextEntity.STAGE) {
        entity.isDone = true;
      }
    });
  }

  clearDoneText() {
    this.textEntities.forEach((entity, index) => {
      if (entity.isDone) {
        entity.textView.destroy();
        this.textEntities.splice(index, 1);
      }
    });
  }
}
