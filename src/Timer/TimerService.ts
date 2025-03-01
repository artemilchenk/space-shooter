import { DoAfter } from "./DoAfter";
import { DoEvery } from "./DoEvery";
import { Timer } from "./Timer";

export class TimerService extends Timer {
  timers: Timer[] = [];
  constructor() {
    super();
  }

  doAfter(callback: () => void, frameCount: number) {
    const timer = new DoAfter();
    timer.setTimer(callback, frameCount);
    this.timers.push(timer);
  }

  doEvery(callback: () => void, frameCount: number) {
    const timer = new DoEvery();
    timer.setTimer(callback, frameCount);
    this.timers.push(timer);
  }

  update() {
    if (this.timers.length) {
      this.timers.forEach((timer) => timer.update());
      this.clearDoneTimers();
    }
  }

  clearDoneTimers() {
    this.timers.forEach((timer, index) => {
      if (timer.isDone) this.timers.splice(index, 1);
    });
  }
}
