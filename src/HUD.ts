import GameContext from "./GameContext";
import image from "../assets/HUD.png";
import ControllerMobs from "./ControllerMobs";
import Coin from "../assets/GoldCoin.png";
import IA from "./IA";
import engine from "./Engine";
import Pause from "./Scene/Pause";
import Scene from "./Scene/Playing";
import Base from "./Base"
import BaseE from "./BaseEnemy";

import Playing from "./Scene/Playing";
class HUD {


    private HUD = new Image;
    public positionX: number = -50;
    private color = "#A4A5A3";
    private gold = new Image();
    private money = 0;
    private moneyRate = 2;

    private IAm = 0;
    private moneyRateIA = 2;

    private frame = 0;
    private FrameCounter = 0;
    private frameX =0;
    private frameY = 0;

    
    private cont : ControllerMobs = null;
    private IA : IA = null;
    private Play : Playing = null;
    private enemyTimer = 200;
    ///alphas for each button
    private a1 = 0;
    private a2 = 0;
    private a3 = 0;
    private a4 = 0;
    private a5 = 1;

    private ally = 0;

    private priceA;
    private priceB;
    private priceC;
    private priceD;

    private stateBoton1 = false;
    private stateBoton2 = false;
    private stateBoton3 = false;
    private stateBoton4 = false;
    private stateBoton5 = true;
    private backColor = "green"

    private timer = 200;

    constructor()
    {
        
        this.HUD.src = image;
        this.cont = new ControllerMobs();
        this.gold.src = Coin;
        
        
        this.IA = new IA();
    }
    public mouseDownListener = (event: MouseEvent) => {
        
        if(this.timer > 200 && event.offsetX > this.positionX +214 && event.offsetX < this.positionX +214+100 && event.offsetY > 230 && event.offsetY <326 )
        {
            
            this.cont.addmobs(0,this.ally);
            this.timer = 0;
        }

        if(this.timer > 200 && event.offsetX > this.positionX + 214 + 93*2 && event.offsetX < this.positionX +214+100 + 93*2 && event.offsetY > 230 && event.offsetY <326 )
        {

            this.cont.addmobs(2,this.ally);
            this.timer = 0;
        }
        if(this.timer > 200 && event.offsetX > this.positionX + 214 + 93*4 && event.offsetX < this.positionX +214+100 + 93*4 && event.offsetY > 230 && event.offsetY <326 )
        {

            this.cont.addmobs(1,this.ally);
            this.timer = 0;
        }
        if(this.timer > 200 && event.offsetX > this.positionX + 214 + 93*6 && event.offsetX < this.positionX +214+100 + 93*6 && event.offsetY > 230 && event.offsetY <326 )
        {
  
        this.cont.addmobs(3,this.ally);
        this.timer = 0;
            
            
        }

        if(event.offsetX > this.positionX + 214 + 93*20 && event.offsetX < this.positionX +214+100 + 93*20 && event.offsetY > 230 && event.offsetY <326 )
        {


            if(this.stateBoton5){
                this.a5 = 0;
                this.stateBoton5 = false;
            }
            else{
                this.a5 = 1;
                this.stateBoton5 = true;
            }
            


        }
    };
    public render()
    {
        
        this.cont.render();
        const Context = GameContext.context;
        
        Context.beginPath();
        Context.restore();
        Context.save();

        


        Context.drawImage(this.HUD,this.positionX,-Context.canvas.height/3,Context.canvas.width/2,Context.canvas.width/2);
        Context.closePath();

       // background rectangles
        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$50 ",this.positionX + 214,200);
        Context.rect(this.positionX + 214,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();

        

        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$50 ",this.positionX + 214 + 93*2,200);
        Context.rect(this.positionX + 214 + 93*2,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        
        Context.closePath();

        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$50 ",this.positionX + 214 + 93*4,200);
        Context.rect(this.positionX + 214 + 93*4,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();

        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$50 ",this.positionX + 214 + 93*6,200);
        Context.rect(this.positionX + 214 + 93*6,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();
       
        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*20,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fillStyle = "White";
        Context.globalAlpha = this.a5;
        Context.fill();
        Context.closePath();

        Context.beginPath();
        Context.save();
        Context.globalAlpha = 1;
        Context.font = "100px Arial"
        Context.fillStyle = "BLACK";
        Context.fillText("P",this.positionX + 230 + 93*20,320);
        Context.restore();
        Context.closePath();


        //Money HUD
        Context.beginPath();
        Context.save();

       
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("= " + this.money,this.positionX + 230 + 93*11.1,310);
        Context.drawImage(this.gold,6 + 32 * this.frameX,7 + 32 * this.frameY,25,25,this.positionX + 230 + 93*10,240,128,128)
        //Context.drawImage(this.gold,6 + 32 * 2,7 + 32 * 0,25,25,this.positionX + 230 + 93*10,240,128,128)
        Context.restore();

        Context.closePath();
        
        

        //cooldown meshes
        Context.beginPath();
        Context.rect(this.positionX + 214,230,100,96);
        Context.fillStyle = this.color;
        Context.globalAlpha = this.a1;
        Context.fill();
    
        Context.closePath();
        Context.beginPath();
        Context.rect(this.positionX + 214+93*2,230,100,96);
        Context.fillStyle = this.color;
        Context.globalAlpha = this.a2;
        Context.fill();
    
        Context.closePath();
        Context.beginPath();
        Context.rect(this.positionX + 214+93*4,230,100,96);
        Context.fillStyle = this.color;
        Context.globalAlpha = this.a3;
        Context.fill();
    
        Context.closePath();
        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*6,230,100,96);
        Context.fillStyle = this.color;
        Context.globalAlpha = this.a4;
        Context.fill();
    
        Context.closePath();
        Context.closePath();
        Context.restore();
        
    }

    public update()
    {
        
        const Canvas = GameContext.context.canvas;
        const Context = GameContext.context;
        this.positionX = Canvas.scrollLeft;
        this.cont.update();
        
        this.timer =this.timer + 1;
        this.enemyTimer = this.enemyTimer +1;
        if(this.timer >= 200)
        {
        this.a1 = .0;
        this.a2 = .0;
        this.a3 = .0;
        this.a4 = .0;
        }
        else
        {
        this.a1 = .6;
        this.a2 = .6;
        this.a3 = .6;
        this.a4 = .6;

        }
        //money update

        this.FrameCounter++;
        if(this.FrameCounter % 8 == 0)
            this.frameX++;
        
        if(this.frameX % 2 == 0 && this.frameX != 0)
        {
            this.frameX = 0;
            this.frameY++;
        }
        if(this.frameY % 4 == 0 && this.frameY != 0)
        {
            this.frameX = 0;
            this.frameY = 0;
        }
        if(this.FrameCounter % 25 == 0){
            this.money += this.moneyRate;
            this.IAm += this.moneyRateIA;
        }

        let rand = this.IA.update();
        
        if(rand <= 3 && rand >= 0)
            if(this.enemyTimer >= 200)
            {
                this.cont.addmobs(rand,1);

            }
    }


};

export default HUD;