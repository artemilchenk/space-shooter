import { Application, Renderer, Text, TextStyle } from "pixi.js";
import { ETextEntity, ETextNames } from "./Enums";
import { Service } from "./Service";

type TextEntity = {
  id: string;
  type: ETextEntity;
  name: ETextNames;
  textView: Text;
  text: string;
  isDone: boolean;
};

export class ScreenDashboard implements Service {
  textEntities: TextEntity[] = [];
  constructor(private readonly app: Application<Renderer>) {}

  private addTextEntity(entity: TextEntity): void {
    this.textEntities.push(entity);
  }

  addBulletTextEntity(shots: number) {
    const text = `Bullets: ${shots}`;

    this.textEntities.forEach((entity) => {
      if (entity.type === ETextEntity.BOARD) {
        entity.isDone = true;
      }
    });

    const boardTextStyle = new TextStyle({
      fill: "white",
      fontSize: 32,
      fontFamily: "Arial",
    });

    const boardText = new Text({
      text: text,
      style: boardTextStyle,
    });

    boardText.x = 20;
    boardText.y = this.app.canvas.height - boardText.height;

    this.app.stage.addChild(boardText);

    this.addTextEntity({
      id: Date.now().toString(),
      textView: boardText,
      type: ETextEntity.BOARD,
      name: ETextNames.BULLET_COUNT,
      text: text,
      isDone: false,
    });
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

    this.addTextEntity({
      id: Date.now().toString(),
      textView: stageText,
      type: ETextEntity.STAGED,
      name: ETextNames.LEVEL_COUNT,
      text: text,
      isDone: false,
    });
  }

  removeLevelStageTextEntity(): void {
    this.textEntities.forEach((entity) => {
      if (entity.type === ETextEntity.STAGED) {
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

  update() {
    this.clearDoneText();
  }
}
