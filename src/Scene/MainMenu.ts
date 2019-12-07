import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import Playing from "./Playing";
import Config from "./Config"
import audio from "../../assets/The_Healing.mp3";
import Back from "../../assets/Forest.png";

export enum Level {
  Easy = 6,
  Medium = 5,
  Hard = 3,
}

const sound = new Audio(audio);
const image = new Image;
class MainMenu extends Scene {
  private Title: string = "Age of Animals";
  private options: string[] = ["Jugar"];
  private selectedOptionIndex: number = 0;
  private backgroundColorHue = 0;
  private skipUpdate = false;
  private Motor = new Engine();

  private Level: Level = Level.Easy;

  
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
          
          this.Motor.clearScreen();
          this.Motor.changeScene(new Playing(this.Motor));
        }
        else if (this.selectedOptionIndex === 1) {
          sound.pause();
          this.Motor.clearScreen();
          this.Motor.changeScene(new Config(engine));
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
    image.src = Back;
  };

  public render = () => {
    const { context } = GameContext;
    const { width, height } = context.canvas;

    context.save();
    context.beginPath();


    context.drawImage(image,0,0);

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
    context.fillStyle = "black";
    context.fillText(this.Title, width/2 - 500, 0+400);
    
    context.closePath();
    
    context.beginPath();
    context.fillStyle = "black";
    context.strokeStyle = "lawngreen";
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

export default MainMenu;
