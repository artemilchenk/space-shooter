import { Application } from "pixi.js";
import { Game } from "./Game";
import { CanvasDimensions } from "./Constants";

(async () => {
  const app = new Application();
  await app.init({
    width: CanvasDimensions.width,
    height: CanvasDimensions.height,
  });
  const game = new Game(app);

  document.addEventListener("keydown", (key) =>
    game.keyboardProcessor.onKeyDown(key),
  );

  document.addEventListener("keyup", (key) =>
    game.keyboardProcessor.onKeyUp(key),
  );

  document.body.appendChild(app.canvas);

  app.ticker.add(game.update, game);
})();
