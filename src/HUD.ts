import GameContext from "./GameContext";
import image from "../assets/HUD.png";


class HUD {


    private HUD = new Image;
    public positionX: number = -50;

    constructor()
    {
        this.HUD.src = image;


    }

    public render()
    {

    
        const Context = GameContext.context;
        
        Context.beginPath();
        Context.restore();
        Context.save();

        Context.drawImage(this.HUD,this.positionX,-Context.canvas.height/3,Context.canvas.width/2,Context.canvas.width/2);
        Context.closePath();
        Context.beginPath();

        Context.rect(this.positionX + 214,230,100,96);
        Context.fillStyle = "black";
        Context.fill();
        Context.closePath();

        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*2,230,100,96);
        Context.fillStyle = "black";
        Context.fill();
        
        Context.closePath();

        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*4,230,100,96);
        Context.fillStyle = "black";
        Context.fill();
        Context.closePath();

        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*6,230,100,96);
        Context.fillStyle = "black";
        Context.fill();
        Context.closePath();
        

    }

    public update(x:number)
    {
        const Canvas = GameContext.context.canvas;
        const Context = GameContext.context;
        this.positionX = Canvas.scrollLeft;
        console.log(this.positionX);
        
        
    }


};

export default HUD;