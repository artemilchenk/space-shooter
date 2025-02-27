import { TKeyContext } from "./Types";
import { isRegisteredKey } from "./Guards";
import { Game } from "./Game";
import { EBoardRegisteredKeys } from "./Enums";

export class KeyboardProcessor {
  private keyState: TKeyContext = {
    ArrowLeft: {
      isDown: false,
      executeDown: () => {},
      executeUp: () => {},
    },
    ArrowRight: {
      isDown: false,
      executeDown: () => {},
      executeUp: () => {},
    },
    Space: {
      isDown: false,
      executeDown: () => {},
      executeUp: () => {},
    },
  };

  private readonly gameContext: Game;

  constructor(gameContext: Game) {
    this.gameContext = gameContext;
  }

  getButton(keyName: EBoardRegisteredKeys) {
    return this.keyState[keyName];
  }

  onKeyDown(key: KeyboardEvent) {
    if (isRegisteredKey(key.code)) {
      const button = this.keyState[key.code];
      if (!button.isDown) button.isDown = true;
      button.executeDown.call(this.gameContext);
    }
  }

  onKeyUp(key: KeyboardEvent) {
    if (isRegisteredKey(key.code)) {
      const button = this.keyState[key.code];
      if (button.isDown) button.isDown = false;
      button.executeUp.call(this.gameContext);
    }
  }
}
