import GameContext from "./GameContext";
import img from "../assets/base.png";
class Base {

    private vida: number =  3000;
    private xcoord = 0;
    private ycoord = 200;
    private Base = new Image();

    constructor()
    {

        this.Base.src = img;
        this.ycoord = 550;
        this.xcoord = GameContext.context.canvas.width/2 * -1 + -10;
    }
    private getLife()
    {

        return this.vida;
    }

    private subsLife(x:number)
    {
        this.vida -= x;

    }

    public render()
    {
        const Context = GameContext.context;
        Context.beginPath();
        Context.save();
        Context.drawImage(this.Base,this.xcoord,this.ycoord,600,600);
        Context.restore();
        Context.closePath();

    }

    public update()
    {

    }


};

export default Base;