export class Timer {
  count: number = 0;
  callBack: (() => void) | null = null;
  timer = 0;
  isDone: boolean = false;
  constructor() {}
  update() {}
  setTimer(callback: () => void, frameCount: number) {}
}
