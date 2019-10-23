import Scene from "./Scene";

import Engine from "../Engine";
import MainMenu from "./MainMenu";
import Camera from "../Camera";
import background from "../background";

class Playing extends Scene {

  private camera: Camera = null;
  private background: background = null;

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
    
  };

  public update = () => {
   
    this.camera.update();
  };

  public render = () => {
    this.camera.render();
    this.background.render();

  };
}

export default Playing;
