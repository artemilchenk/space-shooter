import { Timer } from "./Timer";

export class DoEvery extends Timer {
  constructor() {
    super();
  }

  update() {
    if (this.count % this.timer == 0 && this.callBack) {
      this.callBack();
    }
    this.count++;
  }

  setTimer(callback: () => void, frameCount: number) {
    this.callBack = callback;
    this.timer = frameCount;
  }
}
