import Engine from "../Engine";
abstract class Scene {
  abstract enter = () => {};
  public abstract update = () => {};
  public abstract render = () => {};

  public abstract handleKeyDown = (event: KeyboardEvent, engine: Engine) => {};
  public abstract handleKeyUp = (event: KeyboardEvent) => {};
}

export default Scene;
