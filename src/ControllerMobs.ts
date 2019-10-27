import Unit from "./Unit";
import Lion from "./Lion";
import Bat from "./bat";
import GameContext from "./GameContext";
import bat from "./bat";
import Bear from "./Bear";

class unidad
{
    tipo: number;
    // 0 = bat
    Bat: Bat;
    
    // 1 = Lion
    Lion: Lion;

    //2 Bear 
    Bear:Bear;
    public render()
    {
        if(this.tipo == 0)
            this.Bat.render();
        if(this.tipo == 2)
            this.Bear.render();
    }
    public update()
    {
        if(this.tipo == 0)
            this.Bat.update();
        if(this.tipo == 2)
            this.Bear.update();
    }
    constructor(x:number)
    {
        this.tipo = x;
        if(x == 0)
        {
            this.Bat = new Bat();
        }
        if(x == 2)
        {
            this.Bear = new Bear();
        }
    }
}
class ControllerMobs
{
    
    public EnemyArr : Array<unidad> = [];
    public Arr : Array<unidad> = [];

    constructor()
    {
        
    }
    
    public update()
    {
        
        if(this.Arr != undefined)
        {
            let len = this.Arr.length;
            for(let i = 0; i < len;i++)
            {
                this.Arr[i].update();
            }
        }
    }

    public render()
    {
        
        if(this.Arr != undefined)
        {
            let len = this.Arr.length;
            for(let i = 0; i < len;i++)
            {
                this.Arr[i].render();
            }
        }
       
    }
    // x tipo 0-3 and y 0 || 1  0-> ally 1 ->enemy
     public  addmobs = (x:number,y:number) =>
    {
        console.log("mob added");
        if(y == 0)
        {
            if(x == 0){
                let uni1 = new unidad(0);
                uni1.Bat.xcoord = -GameContext.context.canvas.width/2 + 300;
                uni1.Bat.ycoord = 900;
                uni1.Bat.Pertenece = y;
                this.Arr.push(uni1);

            }else if (x == 2){
                
                    let uni2 = new unidad(2);
                    uni2.Bear.xcoord = GameContext.context.canvas.width/2 - 300;
                    uni2.Bear.ycoord = 950;
                    uni2.Bear.Pertenece = y;
                    this.Arr.push(uni2);
            }

        }else
        {

        }
        

        if(x = 0)
    }

};
export default ControllerMobs;