import Scene from "./Scene";

import Engine from "../Engine";
import MainMenu from "./MainMenu";
import Camera from "../Camera";
import background from "../background";
import HUD from "../HUD.ts";

class Playing extends Scene {

  private camera: Camera = null;
  private background: background = null;
  private HUD: HUD = null;

  public handleKeyDown = (event: KeyboardEvent, engine: Engine) => {
    this.camera.handleKeyDown(event);
  };
  public handleKeyUp = (event: KeyboardEvent) => {
    this.camera.handleKeyUp(event);
  };
  public mouseDownListener = (event: MouseEvent) => {
    this.camera.mouseDownListener(event);
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

 
  enter = () => {
   
    this.camera = new Camera();
    this.background = new background();
    this.HUD = new HUD();
        
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
