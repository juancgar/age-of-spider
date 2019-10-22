import Player from "./Player";
import GameContext from "./GameContext";
import Score from "./Score";
class Player2 extends Player {
  public handleKeyPress = (event: KeyboardEvent) => {
    const eventType = event.type;
    const eventValue = event.key;
    
    switch(eventValue)
    {
      case 's':
        {
          console.log("s");
          if(this.getCoordY()  < GameContext.context.canvas.height-this.getBarHeight())          {
            this.setCoordY(this.getCoordY()+ GameContext.context.canvas.height/GameContext.scale);
          }
          break;
        }
        case 'w':
          { 
            console.log("w");
            if(this.getCoordY()  > 0)
          {
            this.setCoordY(this.getCoordY()- GameContext.context.canvas.height/GameContext.scale);
          }

            break;
          }
       default:
          {
            console.log("default");

            break;

          }

    }

  };

  constructor()
  {

    super("cyan");
    this.setCoordX(GameContext.scale);
    this.setCoordY(100);
  }
}

export default Player2;
