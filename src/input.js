export default class InputHandler {
  constructor(hrac, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          hrac.moveLeft();
          break;

        case 39:
          hrac.moveRight();
          break;

        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (hrac.speed < 0) hrac.stop();
          break;

        case 39:
          if (hrac.speed > 0) hrac.stop();
          break;
      }
    });
  }
}