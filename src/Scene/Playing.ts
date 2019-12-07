import Scene from "./Scene";
import Engine from "../Engine";
import MainMenu from "./MainMenu";
import Camera from "../Camera";
import background from "../background";
import HUD from "../HUD.ts";
import Base from "../Base";
import BaseE from "../BaseEnemy";
import MobCont from "../ControllerMobs";
import ControllerMobs from "../ControllerMobs";
import music from "../../assets/Tears.mp3";
import GameContext from "../GameContext";
import Pause from "./Pause";
import Lose from "./Lose";
import Win from "./Win";


class Playing extends Scene {

  private camera: Camera =  new Camera();
  private background: background = null;
  private HUD: HUD = new HUD();
  private Motor;
  private MobCont: MobCont = null;
  private BackGroundMusic = new Audio(music);
  public pause = () =>{}
  constructor(engine: Engine)
  {
    super();
    this.Motor = {engine};
  }
  public win(){
    return this.HUD.win();
  };
  public handleKeyDown = (event: KeyboardEvent, engine: Engine) => {
    this.camera.handleKeyDown(event);

    if(event.key == 'p')
    {
      
      this.BackGroundMusic.pause();
      
      engine.clearScreen();
      engine.changeScene(new Pause(this));
      
      
    }
    
  };
  public handleKeyUp = (event: KeyboardEvent) => {
    this.camera.handleKeyUp(event);
  };
  public mouseDownListener = (event: MouseEvent,engine: Engine) => {
    this.camera.mouseDownListener(event,engine);
    this.HUD.mouseDownListener(event,engine);

    
  };
 


  public mouseEnterListener = (event: MouseEvent) => {
    this.camera.mouseEnterListener(event);
  };
  public mouseMoveListener = (event: MouseEvent) => {
    this.camera.mouseMoveListener(event);
  };

  
  public getCamera = () => {
    return this.camera;
  };

  exit = () =>{
    this.BackGroundMusic.pause();


  };
  enter = () => {
    this.BackGroundMusic.loop = true;
    this.BackGroundMusic.play();
    
    
    this.background = new background();
    

    
    

        
  };

  public update = () => {
   
    this.camera.update();
    
    
    this.HUD.update();
    
    
  };

  public render = () => {
    
    this.camera.render();
    
    
    this.background.render();
 
    this.HUD.render();
    
    
    

  };
 
}

export default Playing;
