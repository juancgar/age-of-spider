import GameContext from "./GameContext";
import Time from "./Time";
// @ts-ignore
import spriteSheet from "/assets/spritesheet.png";

type coords = [number, number];
export enum CharacterDirection {
  Left = -1,
  None = 0,
  Right = 1,
}

class Character {
  private position: coords = [0, 0];
  private characterWidth: number = 80;
  private characterHeight: number = 100;
  private speed = 200;
  private direction: CharacterDirection = CharacterDirection.None;
  private characterImage = new Image();
  private currentCharacterFrame = 0;
  private frameCounter = 0;
  private lastPressedDirection: CharacterDirection = null;

  public getPosition() {
    return this.position;
  }

  public getWidth() {
    return this.characterWidth;
  }

  constructor() {
    const { context } = GameContext;
    const { width, height } = context.canvas;

    this.characterImage.src = spriteSheet;
    this.position = [
      (width - this.characterWidth) / 2,
      height * 0.9 - this.characterHeight,
    ];
  }

  public keydownHandler = (key: string) => {
    switch (key) {
      case "ArrowRight":
        this.direction = CharacterDirection.Right;
        this.lastPressedDirection = this.direction;
        break;
      case "ArrowLeft":
        this.direction = CharacterDirection.Left;
        this.lastPressedDirection = this.direction;

        break;
    }
  };

  public keyupHandler = (key: string) => {
    if (
      (key === "ArrowRight" && this.direction === 1) ||
      (key === "ArrowLeft" && this.direction === -1)
    ) {
      this.direction = CharacterDirection.None;
    }
  };

  public update = () => {
    const { context } = GameContext;
    const { width } = context.canvas;

    let [xPos, yPos] = this.position;

    xPos = xPos + this.speed * this.direction * Time.deltaTime;
    this.position = [xPos, yPos];

    this.frameCounter += 1;
    if (
      this.frameCounter % 2 === 0 &&
      this.direction !== CharacterDirection.None
    ) {
      this.currentCharacterFrame = (this.currentCharacterFrame + 1) % 15;
    }
  };

  public render = () => {
    const { context } = GameContext;
    let [xPos, yPos] = this.position;
    const offsetX = 108.8;
    const sy = 0;
    const sWidth = 55;
    const sHeight = 92;

    context.save();
    if (this.lastPressedDirection === CharacterDirection.Left) {
      context.scale(-1, 1);
      xPos = -xPos - this.characterWidth;
    }

    context.translate(xPos, yPos);

    context.beginPath();
    context.fillStyle = "lime";
    context.drawImage(
      this.characterImage,
      this.currentCharacterFrame * offsetX,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      this.characterWidth,
      this.characterHeight
    );
    context.closePath();
    context.restore();
  };
}

export default Character;
