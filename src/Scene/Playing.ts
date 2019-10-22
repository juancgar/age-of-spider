import Scene from "./Scene";
import Character from "../Character";
import Engine from "../Engine";
import MainMenu from "./MainMenu";
import Camera from "../Camera";
import background from "../background";

class Playing extends Scene {
  private character: Character = null;
  private camera: Camera = null;
  private background: background = null;

  public handleKeyDown = (event: KeyboardEvent, engine: Engine) => {
    this.character.keydownHandler(event.key);
    switch (event.key) {
      case "Escape":
        engine.changeScene(new MainMenu());
        break;
    }
  };
  public handleKeyUp = (event: KeyboardEvent) => {
    this.character.keyupHandler(event.key);
  };

  public getCamera = () => {
    return this.camera;
  };

  public getCharacter = () => {
    return this.character;
  };

  enter = () => {
    this.character = new Character();
    this.camera = new Camera();
    this.background = new background();
    
  };

  public update = () => {
    this.character.update();
    this.camera.update(this.character);
  };

  public render = () => {
    this.camera.render();
    this.background.render();
    this.character.render();
  };
}

export default Playing;
