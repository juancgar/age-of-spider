
import Unit from "../src/Unit";
import image from "../assets/Bear.png";
import GameContext from "./GameContext";
export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }
class Bear extends Unit
{
    public Pertenece;
    public range;
    public attack = 20;
    public xcoord;
    public life = 400;
    public ycoord;
    public State: State =  State.Walk;
    private Bear = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    private speed = 5;
    public realx = 0;
 
    
    constructor()
    {
        super();
        this.Bear = new Image();
        this.Bear.src = image;
    }


    public render()
    {
        let sx = 0;
        let sy = 0;
        
        let sWidth = 64;
        let sHeight = 33;

        const context = GameContext.context;

        context.beginPath();
        context.save();
        if(this.Pertenece == 0)
        {
            context.scale(-1,1);
        }
        context.drawImage(this.Bear,sx + sWidth*this.frame,sy,sWidth,sHeight,this.xcoord,this.ycoord,200,100);
        
        context.restore();

        context.closePath();


    }
    public update()
    {
        if(this.State == State.Walk){
            this.FrameCounter++;
            if(this.FrameCounter % 10 == 0){
                this.frame++;
            }
            if(this.frame > 4)
            {
                this.frame = 0;
            }
            
                this.xcoord -= this.speed;

                if(this.Pertenece == 1)
            {
                this.realx -= this.speed;
            }
            else
                this.realx += this.speed;
        }else if(this.State == State.Attack)
        {
            this.FrameCounter++;
            if(this.FrameCounter % 10 == 0){
                this.frame++;
            }
            if(this.frame > 4)
            {
                this.frame = 0;
            }

        }else{

        }
        
        

        
    }

};
export default Bear;