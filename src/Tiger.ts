
import Unit from "../src/Unit";
import image from "../assets/tigers.png";
import GameContext from "./GameContext";


export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }
class Tiger extends Unit
{
    public Pertenece;
    public range;
    public life = 2000;
    public attack = 10;
    public xcoord;
    public ycoord;
    public State: State =  State.Walk;
    
    private Tiger = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    public speed = 5;
    public realx = 0;
    
    constructor()
    {
        super();
        this.Tiger = new Image();
        this.Tiger.src = image;
    }


    public render()
    {
        let sx = 0;
        let sy = 0;
        
        let sWidth = 575;
        let sHeight = 552;

        const context = GameContext.context;

        context.beginPath();
        context.save();
        if(this.Pertenece == 1)
        {
            context.scale(-1,1);
        }
        context.drawImage(this.Tiger,sx + sWidth*this.frame,sy,sWidth,sHeight,this.xcoord,this.ycoord,180,140);
        
        context.restore();

        context.closePath();


    }
    public update()
    {
        if(this.State == State.Walk){
            this.FrameCounter++;
            if(this.FrameCounter % 8 == 0){
                this.frame++;
            }
            if(this.frame > 5)
            {
                this.frame = 0;
            }
            if(this.Pertenece == 1)
            {
                this.xcoord += this.speed;
            }
            else
            {
                this.xcoord += this.speed;
            }
            if(this.Pertenece == 1)
            {
                this.realx -= this.speed;
            }
            else
                this.realx += this.speed;
        }
        else if(this.State == State.Attack)
        {
            this.FrameCounter++;
            if(this.FrameCounter % 8 == 0){
                this.frame++;
            }
            if(this.frame > 5)
            {
                this.frame = 0;
            }

            

        };

    
    }

};
export default Tiger;