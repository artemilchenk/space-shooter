export class TimerUnit {
  count: number = 0;
  callBack: (() => void) | null = null;
  timer = 0;
  isDone: boolean = false;
  constructor() {}

  update() {
    if (this.count >= this.timer && this.callBack) {
      this.callBack();
      this.callBack = null;
      this.count = 0;
      this.isDone = true;
    }

    if (this.callBack) this.count++;
  }

  setTimer(callback: () => void, frameCount: number) {
    this.callBack = callback;
    this.timer = frameCount;
  }
}
