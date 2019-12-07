import Engine from "../Engine";
abstract class Scene {
  abstract enter = () => {};
  public abstract update = () => {};
  public abstract render = () => {};
  public abstract pause = () =>{};
  abstract exit = () =>{}

  public abstract handleKeyDown = (event: KeyboardEvent, engine: Engine) => {};
  public abstract handleKeyUp = (event: KeyboardEvent) => {};
  public abstract mouseDownListener = (event: MouseEvent,engine: Engine) => {};
  public abstract mouseEnterListener = (event: MouseEvent) => {};
  public abstract mouseMoveListener = (event: MouseEvent) => {};
  public abstract win();
}

export default Scene;
