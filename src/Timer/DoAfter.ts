import { Timer } from "./Timer";

export class DoAfter extends Timer {
  constructor() {
    super();
  }

  update() {
    if (this.count >= this.timer && this.callBack) {
      this.callBack();
      this.callBack = null;
      this.isDone = true;
    }
    this.count++;
  }

  setTimer(callback: () => void, frameCount: number) {
    this.callBack = callback;
    this.timer = frameCount;
  }
}
