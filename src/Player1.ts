import Player from "./Player";
import GameContext from "./GameContext";
import Score from "./Score";

class Player1 extends Player {
  public handleKeyPress = (event: KeyboardEvent) => {
    const eventType = event.type;
    const eventValue = event.key;

    switch(eventValue)
    {
      case "ArrowDown":
        {
          console.log("arriba");
          console.log(this.getCoordY());
          if(this.getCoordY()  < GameContext.context.canvas.height-this.getBarHeight())
          {
            this.setCoordY(this.getCoordY()+ GameContext.context.canvas.height/GameContext.scale);
          }
          break;
        }
        case "ArrowUp":
          { 
            console.log(this.getCoordY());
            if(this.getCoordY()  > 0)
              this.setCoordY(this.getCoordY()- GameContext.context.canvas.height/GameContext.scale);
              break;
          }
          case 'p':
          {
            do
            {
              
            }while(eventValue == 'p');
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
    
    super("lime");
    this.setCoordX(500-GameContext.scale);
    this.setCoordY(100);


  }
  
}

export default Player1;
