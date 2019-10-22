import Character from "./Character";
import GameContext from "./GameContext";

class Camera {
  private position = [0, 0];
  private width = 400;
  private readonly padding = 50;

  public getLeft = () => {
    return this.position[0];
  };

  update(character: Character) {
    const [charx] = character.getPosition();
    let [camx, camy] = this.position;
    const characterWidth = character.getWidth();

    if (charx < camx + this.padding) {
      this.position = [charx - this.padding, camy];
    }
    if (charx + characterWidth > camx + this.width - this.padding) {
      this.position = [
        charx + characterWidth - this.width + this.padding,
        camy,
      ];
    }
    [camx, camy] = this.position;

    this.position = [camx, camy];
  }

  render() {
    const { context } = GameContext;
    const [camaraX] = this.position;

    context.restore();
    context.save();
    context.translate(-camaraX, 0);
  }
}

export default Camera;
