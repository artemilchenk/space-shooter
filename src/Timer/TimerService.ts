import { TimerUnit } from "./TimerUnit";

export class TimerService {
  timers: TimerUnit[] = [];
  constructor() {}

  doAfter(callback: () => void, frameCount: number) {
    const timer = new TimerUnit();
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
