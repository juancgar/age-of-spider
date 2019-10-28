
import Unit from "../src/Unit";
import image from "../assets/bat.png";
import GameContext from "./GameContext";
export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }

class bat extends Unit
{
    public Pertenece;
    public range;
    public attack = 20;
    public life = 100;
    public xcoord;
    public ycoord;
    public State: State =  State.Walk;
    private bat = new Image();
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
        this.bat = new Image();
        this.bat.src = image;
    }


    public render()
    {
        let sx = 28;
        let sy = 33;
        let padding =60;
        let sWidth = 293;
        let sHeight = 330;

        const context = GameContext.context;

        context.beginPath();
        context.save();
        if(this.Pertenece == 1)
        {
            context.scale(-1,1);
        }
        context.drawImage(this.bat,sx + sWidth*this.frame*2,sy,sWidth,sHeight,this.xcoord,this.ycoord,100,100);

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
            if(this.frame > 2)
            {
                this.frame = 0;
            }
            if(this.Pertenece == 0)
            {
                this.xcoord += this.speed;
            }else
            this.xcoord += this.speed;
            if(this.Pertenece == 1)
            {
                    this.realx -= this.speed;
            }
                else
                    this.realx += this.speed;   
        }else if(this.State == State.Attack)
        {
            this.FrameCounter++;
            if(this.FrameCounter % 8 == 0){
                this.frame++;
        
                
            }
            if(this.frame > 2)
            {
                this.frame = 0;
            }

        }else 
        {

        }

    }

};
export default bat;