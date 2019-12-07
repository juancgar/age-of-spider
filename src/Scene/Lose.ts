import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import Playing from "./Playing";
import audio from "../../assets/The_Healing.mp3";
import Back from "../../assets/LOSE.jpg";
import Loser from "../../assets/gameover.png"
import MainMenu from "./MainMenu";

const sound = new Audio(audio);

class Lose extends Scene {
  private Title: string = "";
  private options: string[] = ["Regresar Al Menu"];
  private selectedOptionIndex: number = 0;
  private backgroundColorHue = 0;
  private skipUpdate = false;
  private image = new Image();
  private Loser = new Image();
  private Motor: Engine;
  public win(){
    return 3;
  };
  constructor(engine: Engine)
  {
    super();
    this.Motor = engine;

  }
  public handleKeyDown = (event: KeyboardEvent, engine: Engine) => {
    switch (event.key) {
      case "ArrowUp":
        this.selectedOptionIndex =
          (this.selectedOptionIndex - 1 + this.options.length) %
          this.options.length;
        break;
      case "ArrowDown":
        this.selectedOptionIndex =
          (this.selectedOptionIndex + 1) % this.options.length;
        break;
      case "Enter":
        if (this.selectedOptionIndex === 0) {
          sound.pause();
          engine.clearScreen();
          engine.changeScene(new MainMenu(this.Motor));
        }
        break;
    }
  };
  exit = () =>{}
  pause = () =>{}
  public handleKeyUp = (event: KeyboardEvent) => {};

  public mouseDownListener = (event: MouseEvent)=>{};
  public mouseEnterListener = (event: MouseEvent)=>{};
  public mouseMoveListener = (event: MouseEvent)=>{};
  public enter = () => {
    sound.play();
    this.image.src = Back;
    this.Loser.src = Loser;
  };

  public render = () => {
    const { context } = GameContext;
    const { width, height } = context.canvas;

    context.save();
    context.beginPath();


    context.drawImage(this.image,0,0,2400,1200);
    context.drawImage(this.Loser,800,100,800,600);

    context.closePath();
    /*if (!this.skipUpdate) {
      this.backgroundColorHue = (this.backgroundColorHue + 1) % 360;
    }
    this.skipUpdate = !this.skipUpdate;
    context.fillStyle = `hsl(${this.backgroundColorHue}, 100%, 80%)`;
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";
*/
    context.font = "160px sans-serif";
    context.fillText(this.Title, width/2 - 500, 0+400);
    
    context.closePath();
    
    context.beginPath();
    context.fillStyle = "red";
    context.strokeStyle = "cyan";
    context.font = "100px sans-serif";
    context.textAlign = "center";
    for (let i = 0; i < this.options.length; i++) {
      const xPoint = width / 2;
      const yPoint = height * 0.65 + i * 100;
      if (this.selectedOptionIndex === i) {
        context.lineWidth = 2;
        context.strokeText(this.options[i], xPoint, yPoint);
      }
      context.fillText(this.options[i], xPoint, yPoint);
    }
    
    context.closePath();

    context.restore();
  };

  public update: () => {};
}

export default Lose;
