import Engine from "../Engine";
abstract class Scene {
  abstract enter = () => {};
  public abstract update = () => {};
  public abstract render = () => {};

  public abstract handleKeyDown = (event: KeyboardEvent, engine: Engine) => {};
  public abstract handleKeyUp = (event: KeyboardEvent) => {};
  public abstract mouseDownListener = (event: MouseEvent) => {};
  public abstract mouseEnterListener = (event: MouseEvent) => {};
  public abstract mouseMoveListener = (event: MouseEvent) => {};
}

export default Scene;
