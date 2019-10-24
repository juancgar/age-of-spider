import GameContext from "./GameContext";


class Camera {
  public position = 0;
  public realtPos = 0;
  private width = 1200;
  private inside = false;
  private dir = 0;
  private readonly padding = 12;



  public handleKeyDown = (event: KeyboardEvent) => {
    
  };
  public handleKeyUp = (event: KeyboardEvent) => {
    
  };
  public mouseDownListener = (event: MouseEvent) => {
    
  };
  public mouseEnterListener = (event: MouseEvent) => {
    this.position = event.offsetX;
    
  };
  public mouseMoveListener = (event: MouseEvent) => {
    
  };
  constructor()
  {
    
  }

  update() {
   
   
    if(this.position >= 1000 && this.realtPos > -1200)
    {
      this.dir = -1;
      this.realtPos -= this.padding; 
      
    }
    else if(this.position <= 200 && this.realtPos < 1200 )
    {
      this.dir = 1;
      this.realtPos += this.padding; 
    }else
    {

    }
    
  }

  render() {
    const { context } = GameContext;
    const camaraX = this.position;


    
    context.restore();
    context.save();
    if(this.dir != 0)
      context.translate( this.realtPos + this.dir*this.padding,0);
  }
}

export default Camera;
