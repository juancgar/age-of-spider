import GameContext from "./GameContext";

class Score {
  private static scorePlayer1: number = 0;
  private static scorePlayer2: number = 0;
  private static readonly scoreIncrement: number = 20;
  private static readonly color = "gray";

  public static increaseScorePlayer1 = () => {
    Score.scorePlayer1 += Score.scoreIncrement;
  };

  public static increaseScorePlayer2 = () => {
    Score.scorePlayer2 += Score.scoreIncrement;
  };

  public static render = () => {
    const { context } = GameContext;
    const { width } = context.canvas;

    context.save();
    context.beginPath();
    context.fillStyle = Score.color;
    context.font = "30px sans-serif";
    context.fillText(String(Score.scorePlayer1),50,50);
    context.fillText(String(Score.scorePlayer2),450,50);
    context.fill;
    

    context.closePath();
    context.restore();
  };
}

export default Score;
