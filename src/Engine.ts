import GameContext from "./GameContext";
import Time from "./Time";


class Engine {
  private isPaused = false;


  // Iniciar el motor del juego.
  public start = () => {
    this.init();
    requestAnimationFrame(this.tick);
  };

  public eventListener = (event: KeyboardEvent) => {

  };

  // Limpiar pantalla y dibujar fondo.
  private clearScreen = () => {
    const context = GameContext.context;
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;

    context.save();
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    // Todo

    context.closePath();
    context.restore();
  };

  public init = () => {
    const width = GameContext.context.canvas.width;

    // Todo.

  };

  // Método que se ejecuta en cada frame del juego.
  public tick = () => {
    this.clearScreen();
    Time.update();


    requestAnimationFrame(this.tick);
  };
}

export default Engine;
