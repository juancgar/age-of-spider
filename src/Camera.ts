import GameContext from "./GameContext";

class Camera {
  private position = 0;
  private realtPos = 0;
  private width = 1200;
  private dir = 0;
  private readonly padding = 7;

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
  update() {
    if(this.position >= 1000 && this.realtPos > -2400)
    {
      this.dir = -1;
      this.realtPos -= this.padding; 
      
    }
    else if(this.position <= 200 && this.realtPos < 2400 )
    {
      this.dir = 1;
      this.realtPos += this.padding; 
    }else
    {

    }
    console.log(this.realtPos);
  }

  render() {
    const { context } = GameContext;
    const camaraX = this.position;
    console.log(this.dir);
    context.restore();
    context.save();
    if(this.dir != 0)
      context.translate( this.realtPos + this.dir*this.padding,0);
  }
}

export default Camera;
