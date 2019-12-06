import GameContext from "./GameContext";
import img from "../assets/base.png";
import healthBar from "../assets/HealthBar.png";
class BaseEnemy {

    private vida: number =  3000;
    private xcoord = 0;
    private ycoord = 200;
    private Base = new Image();
    private life = new Image();

    private lifebar = 685;
    constructor()
    {

        this.Base.src = img;
        this.ycoord = 550;
        this.xcoord = GameContext.context.canvas.width+1210;
        this.life.src = healthBar;
    }
    public getLife()
    {

        return this.vida;
    }

    public subsLife(x:number)
    {
        this.vida -= x;

    }

    public render()
    {
        const Context = GameContext.context;
        Context.beginPath();
        Context.save();
        Context.scale(-1,1);
        Context.rect(-this.xcoord+50,this.ycoord-70,this.lifebar,50);
        Context.fillStyle = "green";
        Context.fill();
        Context.drawImage(this.Base,-this.xcoord,this.ycoord,600,600);
        Context.drawImage(this.life,-this.xcoord-90,this.ycoord-150);
        
        Context.restore();
        Context.closePath();

    }

    public update()
    {
        this.lifebar = (685 / 3000) * this.vida;

    }

};

export default BaseEnemy;