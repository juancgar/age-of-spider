import Scene from "./Scene";

import Engine from "../Engine";
import MainMenu from "./MainMenu";

import Camera from "../Camera";
import background from "../background";
import HUD from "../HUD.ts";
import Base from "../Base.ts";
import BaseE from "../BaseEnemy.ts";
import MobCont from "../ControllerMobs";
import ControllerMobs from "../ControllerMobs";
import music from "../../assets/Tears.mp3";
import GameContext from "../GameContext";
import Pause from "./Pause";


class Playing extends Scene {

  private camera: Camera = null;
  private background: background = null;
  private HUD: HUD = null;
  private Base: Base = null;
  private BaseE: BaseE = null;
  private MobCont: MobCont = null;
  private BackGroundMusic = new Audio(music);
  public pause = () =>{}

  public handleKeyDown = (event: KeyboardEvent, engine: Engine) => {
    this.camera.handleKeyDown(event);

    if(event.key == 'p')
    {
      let temp: Playing = this;
      this.BackGroundMusic.pause();
      engine.clearScreen();
      
      engine.changeScene(new Pause(temp));
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
    this.camera = new Camera();
    this.background = new background();  
    this.Base = new Base();
    this.BaseE = new BaseE();
    this.HUD = new HUD();
    const canvas = GameContext.context.canvas;
    GameContext.context.clearRect(0,0,canvas.width,canvas.height);


  };
  enter = () => {
   
    this.BackGroundMusic.play();
    this.camera = new Camera();
    this.background = new background();
    
    this.Base = new Base();
    this.BaseE = new BaseE();
    
    this.HUD = new HUD();

        
  };

  public update = () => {
   
    this.camera.update();
    
    
    this.HUD.update();
    
    
  };

  public render = () => {
    
    this.camera.render();
    
    
    this.background.render();
    this.Base.render();
    this.BaseE.render();
    this.HUD.render();
    
    
    

  };
}

export default Playing;
