
import Unit from "./Unit";
import image from "../assets/lions.png";
import imageA from "../assets/LIONSA.png";
import GameContext from "./GameContext";
import Slap from "../assets/slap3.wav";
export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }
  const sound = new Audio(Slap);
class Lion extends Unit
{
    public Pertenece;
    public range;
    public attack = 16;
    public xcoord;
    public life = 3500;
    public attackB = 300;
    public ycoord;
    public State: State =  State.Walk;
    private Lion = new Image();
    private LionA = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    public speed = 6;
    public realx = 0;
 
    
    constructor()
    {
        super();
        this.Lion = new Image();
        this.Lion.src = image;
        this.LionA.src = imageA;
    }


    public render()
    {
        if(this.State == State.Walk){
            let sx = 0;
            let sy = 0;
            
            let sWidth = 580;
            let sHeight = 520;

            const context = GameContext.context;

            context.beginPath();
            context.save();
            if(this.Pertenece == 1)
            {
                context.scale(-1,1);
            }
            context.drawImage(this.Lion,sx + sWidth*this.frame,sy,sWidth,sHeight,this.xcoord,this.ycoord,180,140);
            
            context.restore();

            context.closePath();
        }
        else if(this.State == State.Attack){
            let sx = 0;
            let sy = 0;
            
            let sWidth = 62;
            let sHeight = 50;

            const context = GameContext.context;

            context.beginPath();
            context.save();
            if(this.Pertenece == 1)
            {
                context.scale(-1,1);
            }
            context.drawImage(this.LionA,sx + sWidth*this.frame,sy,sWidth,sHeight,this.xcoord,this.ycoord,230,160);
            
            context.restore();

            context.closePath();
        }
        else{
            let sx = 0;
            let sy = 0;
            
            let sWidth = 580;
            let sHeight = 520;

            const context = GameContext.context;

            context.beginPath();
            context.save();
            if(this.Pertenece == 1)
            {
                context.scale(-1,1);
            }
            context.drawImage(this.Lion,sx + sWidth,sy,sWidth,sHeight,this.xcoord,this.ycoord,180,140);
            
            context.restore();

            context.closePath();
        }

    }
    public update()
    {
        //walk
            if(this.State == State.Walk){
            this.FrameCounter++;
            if(this.FrameCounter % 10 == 0){
                this.frame++;
            }
            if(this.frame > 2)
            {
                this.frame = 0;
            }
            
            if(this.Pertenece == 1)
            {
                this.realx -= this.speed;
            }
            else
                this.realx += this.speed;
        
                this.xcoord += this.speed;

                
        }//attack
        else if(this.State == State.Attack)
        {
                this.FrameCounter++;
                if(this.FrameCounter % 10 == 0){
                    sound.play();
                    this.frame++;
                }
                if(this.frame > 2)
                {
                    this.frame = 0;
                }
                
        }
        else{

        }
    }


};
export default Lion;