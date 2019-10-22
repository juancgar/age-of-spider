import GameContext from "./GameContext";
import Time from "./Time";
import Player from "./Player";
import { checkIntersection } from "./Utils";
import Score from "./Score";
import Player2 from "./Player2";
import audio from "../assets/thud.mp3";
import { createThis } from "typescript";

class Ball {
  private color: string = "white";
  // Velocidad con que se mueve la bola, expresado en pixeles por segundo.
  private speed: number = 200;
  // Vector unitario que indica la dirección de la velocidad
  private angle: [number, number] = [1, 1];
  private radius: number = 15;
  private coordX: number = GameContext.context.canvas.width/2;
  private coordY: number = GameContext.context.canvas.height/2;
  private move = 1;
  private sound = new Audio(audio);
  public getRadius = () => {
    return this.radius;
  };

  public getCoordX = () => {
    return this.coordX;
  };

  public getCoordY = () => {
    return this.coordY;
  };

  /**
   ** Método que sirve para revisar si un objeto *Ball* colisiona con un objeto
   ** tipo Player
   */

   private init()
   {
   this.coordX = GameContext.context.canvas.width/2;
   this.coordY = GameContext.context.canvas.height/2;
   

   }
  public checkCollisionWith = (player: Player) => {
    const { intersects, angleX, angleY } = checkIntersection(player, this);
    if (intersects) {
      this.angle[0] = this.angle[0] * -1;
      
    }
  };

  public update = () => {
    const { width, height } = GameContext.context.canvas;
    const [angleX, angleY] = this.angle;
    
    if(this.getCoordX() > 480)
    {
      Score.increaseScorePlayer1();
      this.sound.play();
      this.reset();
    }
    if(this.getCoordX() < 40) 
    {
      Score.increaseScorePlayer2();
      this.sound.play();
      this.reset();
    }
    if(this.getCoordY() > GameContext.context.canvas.height)
    {
      this.angle[1] = -1;
    }
    if(this.getCoordY() <0)
    {
      this.angle[1] = 1;
    }
    this.coordX = this.coordX + this.angle[0] *(this.speed - this.radius)/this.speed;
    this.coordY = this.coordY + this.angle[1] * ((this.speed - this.radius)/this.speed);
    // Todo
  };

  public reset = () => {
    const { width, height } = GameContext.context.canvas;
    this.init();
    // Todo
  };

  /**
   ** Método que dibuja la bola en pantalla. No te preocupes mucho por este código.
   */
  public render = () => {
    const { context } = GameContext;

    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.coordX, this.coordY, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
  };
}

export default Ball;
