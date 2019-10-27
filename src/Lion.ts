
import Unit from "../src/Unit";
import image from "../assets/bat.png";
import GameContext from "./GameContext";
class Lion extends Unit
{
    public Pertenece;
    public range;
    public attack;
    public xcoord;
    public ycoord;
    private Lion = new Image();
    //animation variables
    private padding;
    private frame = 0;
    private FrameCounter = 0;
    private xCutAnimation = 0;
    private speed = 200;
 
    
    constructor()
    {
        super();
        this.Lion = new Image();
        this.Lion.src = image;
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

        context.drawImage(this.Lion,sx + sWidth*this.frame*2,sy,sWidth,sHeight,this.xcoord,this.ycoord,100,100);

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
        this.xcoord += 5;
        


    }

};
export default Lion;