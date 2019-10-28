import Unit from "./Unit";
import Lion from "./Lion";
import Bat from "./bat";
import GameContext from "./GameContext";
import bat from "./bat";
import Bear from "./Bear";
import Tiger from "./Tiger";
import { all } from "q";

export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }


class unidad
{
    tipo: number;
    // 0 = bat
    Bat: Bat;
    
    // 1 = Lion
    Lion: Lion;

    //2 Bear 
    Bear:Bear;

    //3 Tiger
    Tiger:Tiger;
    public render()
    {
        if(this.tipo == 0)
            this.Bat.render();
        if(this.tipo == 2)
            this.Bear.render();
        if(this.tipo == 1)
            this.Lion.render();
        if(this.tipo == 3)
            this.Tiger.render();
    }
    public accessObject ()
    {
        if(this.tipo == 0)
            return this.Bat;
        if(this.tipo == 2)
            return this.Bear;
        if(this.tipo == 1)
            return this.Lion;
        if(this.tipo == 3)
           return this.Tiger;
    }
    public update()
    {
        if(this.tipo == 0)
            this.Bat.update();
        if(this.tipo == 2)
            this.Bear.update();
        if(this.tipo == 1)
            this.Lion.update();
        if(this.tipo == 3)
            this.Tiger.update();
    }
    public getXcoord()
    {
        if(this.tipo == 0)
            return this.Bat.realx;
        if(this.tipo == 2)
            return this.Bear.realx;
        if(this.tipo == 1)
            return this.Lion.realx;
        if(this.tipo == 3)
            return this.Tiger.realx;
    }
    public setState(State:State)
    {
        if(this.tipo == 0)
            this.Bat.State = State;
        if(this.tipo == 2)
            this.Bear.State = State;
        if(this.tipo == 1)
            this.Lion.State = State;
        if(this.tipo == 3)
            this.Tiger.State = State;
    }
    constructor(x:number)
    {
        this.tipo = x;
        if(x == 0)
        {
            this.Bat = new Bat();
        }
        else if(x == 2)
        {
            this.Bear = new Bear();
        }
        else if(x == 1)
            this.Lion = new Lion();
        else if(x == 3)
            this.Tiger = new Tiger();
    }

    
}
class ControllerMobs
{
    
    public EnemyArr : Array<unidad> = [];
    public allyHead =0;
    public enemyHead = 0;
    public Arr : Array<unidad> = [];
    private spawnE = false;
    private spawnA = false;

    private gameState: State = State.Walk;

    constructor()
    {
        
    }

    private setAttack()
    {
        
        if(this.EnemyArr != undefined)
        {

            let len = this.EnemyArr.length;
            for(let i = 1; i < len;i++)
            {
                this.EnemyArr[i].setState(State.Stop);
                
                    
            }
        }
//ally
        if(this.Arr != undefined)
        {
            let len = this.Arr.length;
            for(let i = 1; i < len;i++)
            {
                this.Arr[i].setState(State.Stop);
            }
        }
    }
    
    public update()
    {
        
        
        
        
        //enemy
        

        //Atack Logic
        if(this.gameState == State.Walk){
            if(this.spawnE && this.spawnA){
                console.log(this.Arr[this.allyHead].getXcoord() + " " + this.EnemyArr[this.enemyHead].getXcoord());
                if(this.Arr[this.allyHead].getXcoord() + 600 >= this.EnemyArr[this.enemyHead].getXcoord())
                {
                    console.log("encuentro");
                    this.Arr[this.allyHead].setState(State.Attack);
                    this.EnemyArr[this.enemyHead].setState(State.Attack);
                    this.setAttack();
                }

            }

            if(this.EnemyArr != undefined)
            {

                let len = this.EnemyArr.length;
                for(let i = 0; i < len;i++)
                {
                    this.EnemyArr[i].update();
                    this.spawnE = true;
                        
                }
            }
    //ally
            if(this.Arr != undefined)
            {
                let len = this.Arr.length;
                for(let i = 0; i < len;i++)
                {
                    this.Arr[i].update();
                    
                    this.spawnA = true;
                }
            }
        

        }
    
    else if(this.gameState == State.Attack)
    {

        this.Arr[this.allyHead]
    }
    

    }
    public render()
    {
        //enemy
        if(this.EnemyArr != undefined)
        {
            let len = this.EnemyArr.length;
            for(let i = 0; i < len;i++)
            {
                this.EnemyArr[i].render();
            }
        }
//ally
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
                uni1.Bat.State = State.Walk;
                uni1.Bat.realx = 0;
                this.Arr.push(uni1);
                

            }else if (x == 2){
                
                 let uni2 = new unidad(2);
                 uni2.Bear.xcoord = GameContext.context.canvas.width/2 - 300;
                 uni2.Bear.ycoord = 950;
                 uni2.Bear.Pertenece = y;
                 uni2.Bear.realx = 0;
                 uni2.Bear.State = State.Walk;
                this.Arr.push(uni2);
            }
            else if (x == 1){
                
                let uni2 = new unidad(1);
                uni2.Lion.xcoord = -GameContext.context.canvas.width/2 + 300;
                uni2.Lion.ycoord = 950;
                uni2.Lion.Pertenece = y;
                uni2.Lion.State = State.Walk;
                uni2.Lion.realx = 0;
                this.Arr.push(uni2);
        }
        else if (x == 3){
                
            let uni2 = new unidad(3);
            uni2.Tiger.xcoord = -GameContext.context.canvas.width/2 + 300;
            uni2.Tiger.ycoord = 950;
            uni2.Tiger.Pertenece = y;
            uni2.Tiger.realx = 0;
            uni2.Tiger.State = State.Walk;
            this.Arr.push(uni2);
    }
    //enemy

        }else
            {
            if(x == 0){
                let uni1 = new unidad(0);
                uni1.Bat.xcoord = -GameContext.context.canvas.width - 800;
                uni1.Bat.ycoord = 900;
                uni1.Bat.Pertenece = y;
                uni1.Bat.realx = 4200;
                this.EnemyArr.push(uni1);

            }else if (x == 2){
                
                let uni2 = new unidad(2);
                uni2.Bear.xcoord = GameContext.context.canvas.width + 800;
                uni2.Bear.ycoord = 950;
                uni2.Bear.Pertenece = y;
                uni2.Bear.realx = 4200;
                this.EnemyArr.push(uni2);
            }
            else if (x == 1){
                
                let uni2 = new unidad(1);
                uni2.Lion.xcoord = -GameContext.context.canvas.width- 800;;
                uni2.Lion.ycoord = 950;
                uni2.Lion.Pertenece = y;
                uni2.Lion.realx = 4200;
                this.EnemyArr.push(uni2);
        }
        else if (x == 3){
                
            let uni2 = new unidad(3);
            uni2.Tiger.xcoord = -GameContext.context.canvas.width  - 800;
            uni2.Tiger.ycoord = 950;
            uni2.Tiger.Pertenece = y;
            uni2.Tiger.realx = 4200;
            this.EnemyArr.push(uni2);
    }

        }
        

      
    }

};
export default ControllerMobs;