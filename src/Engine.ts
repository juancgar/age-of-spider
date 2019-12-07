import GameContext from "./GameContext";
import Time from "./Time";
import Scene from "./Scene/Scene";
import MainMenu from "./Scene/MainMenu";
import Playing from "./Scene/Playing";


class Engine {
  private currentScene: Scene = null;
  // Iniciar el motor del juego.
  private winCond = 0;
  public start = () => {
    this.init();
    requestAnimationFrame(this.tick);
  };

  public keydownEventHandler = (event: KeyboardEvent) => {
    this.currentScene.handleKeyDown(event, this);
  };

  public keyupEventHandler = (event: KeyboardEvent) => {
    this.currentScene.handleKeyUp(event);
  };
  public mouseDownListener = (event: MouseEvent,engine: Engine) => {
    this.currentScene.mouseDownListener(event,this);
  };
  public mouseEnterListener = (event: MouseEvent) => {
    this.currentScene.mouseEnterListener(event);
  };
  public mouseMoveListener = (event: MouseEvent)=>{
    this.currentScene.mouseMoveListener(event);

  };
  public win (){
    return this.currentScene.win();
  };
  

  public ScenePause = (scene:Scene) =>{


  };


  public changeScene = (scene: Scene) => {
    
    this.currentScene = scene;
    this.currentScene.enter();
  };

  // Limpiar pantalla y dibujar fondo.
  public clearScreen = () => {
    const context = GameContext.context;
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;

    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.closePath();
    context.restore();
  };
 
  public init = () => {
    this.currentScene = new MainMenu(this);
    this.currentScene.enter();
  };

  // Método que se ejecuta en cada frame del juego.
  public tick = () => {
    this.clearScreen();
    Time.update();
    
    this.currentScene.update();
    this.winCond = this.currentScene.win();
    if(this.winCond == 1)
    {
      this.currentScene.exit();
      this.clearScreen();
      this.changeScene(new MainMenu(this));

    }
    else if(this.winCond == 2)
    {
      this.currentScene.exit();
      this.clearScreen();
      this.changeScene(new MainMenu(this));

    }
    else
    {

    }
    this.currentScene.render();
    
    requestAnimationFrame(this.tick);
  };
}

export default Engine;
