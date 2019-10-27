
import Unit from "../src/Unit";
import image from "../assets/bat.png";
import GameContext from "./GameContext";


class bat extends Unit
{
    public Pertenece;
    public range;
    public attack;
    public xcoord;
    public ycoord;
    private bat = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    private speed = 200;
 
    
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
            this.xcoord += 5;
        }else
            this.xcoord -= 5;
        


    }

};
export default bat;