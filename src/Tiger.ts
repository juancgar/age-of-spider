
import Unit from "../src/Unit";
import image from "../assets/tigers.png";
import imageA from "../assets/TIGREA.png";
import GameContext from "./GameContext";
import Slap from "../assets/slap2.flac";


export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }
  const sound = new Audio(Slap);
class Tiger extends Unit
{
    public Pertenece;
    public range;
    public life = 2000;
    public attack = 10;
    public attackB = 250;
    public xcoord;
    public ycoord;
    public State: State =  State.Walk;
    
    private Tiger = new Image();
    private TigerA = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    public speed = 8;
    public realx = 0;
    
    constructor()
    {
        super();
        this.Tiger = new Image();
        this.Tiger.src = image;
        this.TigerA.src = imageA;
    }


    public render()
    {
        if(this.State == State.Walk){
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
            context.drawImage(this.TigerA,sx + sWidth*this.frame,sy,sWidth,sHeight,this.xcoord,this.ycoord,230,160);
            
            context.restore();

            context.closePath();
        }
        else{
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
            context.drawImage(this.Tiger,sx + sWidth,sy,sWidth,sHeight,this.xcoord,this.ycoord,180,140);
            
            context.restore();

            context.closePath();
        }

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
                sound.play();
                this.frame++;
            }
            if(this.frame > 2)
            {
                this.frame = 0;
            }
            else{

            }

            

        };

    
    }

};
export default Tiger;