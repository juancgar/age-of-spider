import GameContext from "./GameContext";
import Player1 from "./Player1";
import Player2 from "./Player2";
import Ball from "./Ball";
import Time from "./Time";
import Score from "./Score";

class Engine {
  private isPaused = false;
  private player1: Player1 = null;
  private player2: Player2 = null;
  private ball: Ball = null;

  // Iniciar el motor del juego.
  public start = () => {
    this.init();
    requestAnimationFrame(this.tick);
  };

  public eventListener = (event: KeyboardEvent) => {
    this.player1.handleKeyPress(event);
    this.player2.handleKeyPress(event);
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

    this.player1 = new Player1();
    this.player2 = new Player2();
    this.ball = new Ball();

    // Todo.

    this.ball.reset();
  };

  // Método que se ejecuta en cada frame del juego.
  public tick = () => {
    this.clearScreen();
    Time.update();

    this.player1.update();
    this.player2.update();
    this.ball.update();
    this.ball.checkCollisionWith(this.player1);
    this.ball.checkCollisionWith(this.player2);
    this.player1.render();
    this.player2.render();
    Score.render();
    this.ball.render();

    requestAnimationFrame(this.tick);
  };
}

export default Engine;
