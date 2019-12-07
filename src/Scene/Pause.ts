import Scene from "./Scene";
import GameContext from "../GameContext";
import MainMenu from "./MainMenu"
import Engine from "../Engine";
import Back from "../../assets/Forest.png";
import Playing from "./Playing";
import audio from "../../assets/The_Healing.mp3";

const sound = new Audio(audio);
const image = new Image;

class Pause extends Scene {
  private Title: string = "Age Of Animals";
  private options: string[] = ["Continuar", "Salir"];
  private selectedOptionIndex: number = 0;
  private backgroundColorHue = 0;
  private skipUpdate = false;
  private PScene: Scene = null;


  constructor( Play:Playing)
  {
      
      super();
      this.PScene = Play;
      

  }
  exit = () =>{}
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
          engine.changeScene(this.PScene);
        }
        else if (this.selectedOptionIndex === 1) {
          sound.pause();
          engine.clearScreen();
          engine.changeScene(new MainMenu(engine));
        }
        break;
    }
  };


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
    context.fillText(this.Title, width/2 - 500, 0+400);
    
    context.closePath();
    
    context.beginPath();
    context.fillStyle = "black";
    context.strokeStyle = "darkblue";
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

export default Pause;
