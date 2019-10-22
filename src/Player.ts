import GameContext from "./GameContext";
import Time from "./Time";

abstract class Player {
  private color: string;
  private coordX = 0;
  private coordY = 0;
  private readonly barWidth = 20;
  private readonly barHeight = 100;
  // Pixeles por segundo
  private speedY = 400;

  public getBarWidth = () => {
    return this.barWidth;
  };

  public getBarHeight = () => {
    return this.barHeight;
  };

  public getCoordX = () => {
    return this.coordX;
  };

  public getCoordY = () => {
    return this.coordY;
  };

  // Se limita direccion para que solo pueda tener tres valores: -1, 0 o 1.
  // Además, se inicializa en 0.
  protected direction: -1 | 0 | 1 = 0;

  constructor(color: string) {
    const canvasHeight = GameContext.context.canvas.height;
    this.color = color;
    

    // Todo
  }

  public setCoordX = coordX => {
    this.coordX = coordX;
  };
  public setCoordY = coordY => {
    this.coordY = coordY;
  };

  // Método abstracto para leer eventos.
  public abstract handleKeyPress = (event: KeyboardEvent) => {};

  public update = () => {
    const { width, height } = GameContext.context.canvas;
  };

  public render = () => {
    const { context } = GameContext;

    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    ///need changes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    context.rect(this.getCoordX(),this.getCoordY(),this.barWidth,this.barHeight);
    // need changes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    context.fill();
    // Todo
    context.closePath();
    context.restore();
  };
}

export default Player;
