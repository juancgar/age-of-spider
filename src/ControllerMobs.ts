import Unit from "./Unit";
import Lion from "./Lion";
import Bat from "./bat";
import GameContext from "./GameContext";
import bat from "./bat";
import Bear from "./Bear";
import Tiger from "./Tiger";
import Base from "./Base"
import BaseE from "./BaseEnemy";
import { all } from "q";
import { Queue } from 'queue-typescript';


export enum State {
    Attack = -1,
    Stop = 0,
    Walk = 1,
  }


class unidad
{

    public life;
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
            this.life = this.Bat.life;
        }
        else if(x == 2)
        {
            this.Bear = new Bear();
            this.life = this.Bear.life;
        }
        else if(x == 1){
            this.Lion = new Lion();
            this.life = this.Lion.life;
        }
        else if(x == 3){
            this.Tiger = new Tiger();
            this.life = this.Tiger.life;
        }
    }

    
}
class ControllerMobs
{
 

    private Ally = new Queue<unidad>();
    public Enemy = new Queue<unidad>();

    private BaseA : Base = null;
    private BaseB : BaseE = null;

    private initial = false;
    private gameState: State = State.Walk;

    constructor()
    {
        this.BaseA = new Base();
        this.BaseB = new BaseE();
    }

    private setAttack()
    {
        
      
    }
    public subtractLifeAlly(attack) 
    {
        this.BaseA.subsLife(attack);
    }
    public subtractLifeEnemy(attack)
    {
        this.BaseB.subsLife(attack);
    }
    public update()
    {
        
        
        this.checkFront();
        
        for(let unit of this.Enemy.toArray()){
            unit.update();
        }
        for(let unit of this.Ally.toArray()){
            unit.update();
        }

        //deque and take life from enemy base
        
        if(this.Ally.front != null && this.Ally.front.getXcoord() >= 4000)
        {
            this.subtractLifeEnemy(this.Ally.front.accessObject().attack);
            this.Ally.dequeue();
            
        }
        if(this.Enemy.front != null && this.Enemy.front.getXcoord() <= 200)
        {
            this.subtractLifeAlly(this.Enemy.front.accessObject().attack);
            this.Enemy.dequeue();
            
        }
       

        //check for an attack
        if((this.Ally.front != null && this.Enemy.front != null))
        {
            
            if(this.Ally.front.life < 0)
                this.Ally.dequeue();
            if(this.Enemy.front.life < 0)
                this.Enemy.dequeue();
            
        }
        if((this.Ally.front != null && this.Enemy.front != null))
            this.checkAttack(this.Enemy.front,this.Ally.front);
    

    }

    private checkAttack(Ally: unidad, Enemy:unidad)
    {

        if(Ally.accessObject().State != State.Attack ||Enemy.accessObject().State != State.Attack ){
            if(Math.abs(Ally.getXcoord() - Enemy.getXcoord()) <= 400 )
                {
                    Ally.setState(State.Attack);
                    Enemy.setState(State.Attack);
                    return true;
                }
            else if( Math.abs(Ally.getXcoord() - Enemy.getXcoord()) >= 500){
                Ally.setState(State.Walk);
                Enemy.setState(State.Walk);
                return false;

            }
        }
        if(Ally.accessObject().State == State.Attack && Enemy.accessObject().State == State.Attack )
        {
           
            
                Ally.life -= Enemy.accessObject().attack;
                Enemy.life -= Ally.accessObject().attack;
 
        }
    }

    private checkFront()
    {
        if(this.Enemy.front != null){
            
            let temp = this.Enemy.toArray();
            let len = temp.length;

            if(this.Enemy.front != null && this.Ally.front == null)
                this.Enemy.front.setState(State.Walk);
            for(let i = 1; i < len;i++)
            {
                
                    
                    if(Math.abs(temp[i].getXcoord()-temp[i-1].getXcoord()) <= 300)
                        {
                            temp[i].setState(State.Stop);
                        }
                    else
                    {
                        temp[i].setState(State.Walk);
                    } 
            }
        }
        if(this.Ally.front != null){
            
            let temp = this.Ally.toArray();
            let len = temp.length;
            if(this.Ally.front != null && this.Enemy.front == null)
                this.Ally.front.setState(State.Walk);
            for(let i = 1; i < len;i++)
            {
               
                    
                    if(Math.abs(temp[i].getXcoord()-temp[i-1].getXcoord()) <= 300)
                        {
                            temp[i].setState(State.Stop);
                        }
                        else
                        {
                            temp[i].setState(State.Walk);
                        }
                
            }
        }
        this.BaseA.update();
        this.BaseB.update();
    }
    public render()
    {
        //enemy
        for(let unit of this.Enemy.toArray()){
            unit.render()
        }
        for(let unit of this.Ally.toArray()){
            unit.render();
        }
//ally
    this.BaseA.render();
    this.BaseB.render();
       
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
                this.Ally.enqueue(uni1);
                

            }else if (x == 2){
                
                 let uni2 = new unidad(2);
                 uni2.Bear.xcoord = GameContext.context.canvas.width/2 - 300;
                 uni2.Bear.ycoord = 950;
                 uni2.Bear.Pertenece = y;
                 uni2.Bear.realx = 0;
                 uni2.Bear.State = State.Walk;
                this.Ally.enqueue(uni2);
            }
            else if (x == 1){
                
                let uni2 = new unidad(1);
                uni2.Lion.xcoord = -GameContext.context.canvas.width/2 + 300;
                uni2.Lion.ycoord = 950;
                uni2.Lion.Pertenece = y;
                uni2.Lion.State = State.Walk;
                uni2.Lion.realx = 0;
                this.Ally.enqueue(uni2);
        }
        else if (x == 3){
                
            let uni2 = new unidad(3);
            uni2.Tiger.xcoord = -GameContext.context.canvas.width/2 + 300;
            uni2.Tiger.ycoord = 950;
            uni2.Tiger.Pertenece = y;
            uni2.Tiger.realx = 0;
            uni2.Tiger.State = State.Walk;
            this.Ally.enqueue(uni2);
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
                this.Enemy.enqueue(uni1);

            }else if (x == 2){
                
                let uni2 = new unidad(2);
                uni2.Bear.xcoord = GameContext.context.canvas.width + 800;
                uni2.Bear.ycoord = 950;
                uni2.Bear.Pertenece = y;
                uni2.Bear.realx = 4200;
                this.Enemy.enqueue(uni2);
            }
            else if (x == 1){
                
                let uni2 = new unidad(1);
                uni2.Lion.xcoord = -GameContext.context.canvas.width- 800;;
                uni2.Lion.ycoord = 950;
                uni2.Lion.Pertenece = y;
                uni2.Lion.realx = 4200;
                this.Enemy.enqueue(uni2);
        }
        else if (x == 3){
                
            let uni2 = new unidad(3);
            uni2.Tiger.xcoord = -GameContext.context.canvas.width  - 800;
            uni2.Tiger.ycoord = 950;
            uni2.Tiger.Pertenece = y;
            uni2.Tiger.realx = 4200;
            this.Enemy.enqueue(uni2);
    }

        }
        
        
      
    }

};
export default ControllerMobs;