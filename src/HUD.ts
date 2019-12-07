import GameContext from "./GameContext";
import image from "../assets/HUD.png";
import ControllerMobs from "./ControllerMobs";
import Coin from "../assets/GoldCoin.png";
import IA from "./IA";
import engine from "./Engine";
import MainMenu from "./Scene/MainMenu";
import Base from "./Base"
import BaseE from "./BaseEnemy";
import TigerI from "../assets/TIGERI.png";
import LionI from "../assets/LionI.png";
import BatI from "../assets/BATI.png";
import BearI from "../assets/BEARI.png";

import Playing from "./Scene/Playing";
import { HighlightSpanKind } from "typescript";
class HUD {


    private HUD = new Image;
    public positionX: number = -50;
    private color = "#A4A5A3";
    private gold = new Image();
    private money = 0;
    private moneyRate = 2;
<<<<<<< HEAD
    private TigerI = new Image;
    private LionI = new Image;
    private BatI = new Image;
    private BearI = new Image;

=======
    private winCond: number = 0;
    private Motor = new engine();
>>>>>>> ce965194be4875929eb907fd1407bf0b9418633d
    private IAm = 0;
    private moneyRateIA = 2;
  

    private frame = 0;
    private FrameCounter = 0;
    private frameX =0;
    private frameY = 0;

    
    private cont : ControllerMobs = null;
    private IA : IA = null;
    private Play : Playing = null;
    
    ///alphas for each button
    private a1 = 0;
    private a2 = 0;
    private a3 = 0;
    private a4 = 0;
    private a5 = 1;

    private ally = 0;

    private priceA = 20;
    private priceB = 30;
    private priceC = 40;
    private priceD = 50;


    private CooldownA = 50;
    private CooldownB = 190;
    private CooldownC = 250;
    private CooldownD = 400;


    private stateBoton1 = false;
    private stateBoton2 = false;
    private stateBoton3 = false;
    private stateBoton4 = false;
    private stateBoton5 = true;
    private backColor = "green"

    private timer = 200;

    private timerA = this.CooldownA;
    private timerB = this.CooldownB;
    private timerC = this.CooldownC;
    private timerD = this.CooldownD;

    private enemyTimerA = this.CooldownA;
    private enemyTimerB = this.CooldownB;
    private enemyTimerC = this.CooldownC;
    private enemyTimerD = this.CooldownD;

    constructor(m1: engine)
    {
        
        this.HUD.src = image;
        this.cont = new ControllerMobs();
        this.gold.src = Coin;
        this.TigerI.src = TigerI;
        this.LionI.src = LionI;
        this.BatI.src = BatI;
        this.BearI.src = BearI;
        
        this.Motor = m1;
        this.IA = new IA();
    }
    public mouseDownListener = (event: MouseEvent,engine:engine) => {
        this.Motor = engine;

        if( this.money >= this.priceA && this.timerA >= this.CooldownA && event.offsetX > this.positionX +214 && event.offsetX < this.positionX +214+100 && event.offsetY > 230 && event.offsetY <326 )
        {
            
            this.cont.addmobs(0,this.ally);
            this.timerA = 0;
            this.money -= this.priceA;
        }

        if(this.money >= this.priceB && this.timerB >= this.CooldownB && event.offsetX > this.positionX + 214 + 93*2 && event.offsetX < this.positionX +214+100 + 93*2 && event.offsetY > 230 && event.offsetY <326 )
        {

            this.cont.addmobs(3,this.ally);
            this.timerB = 0;
            this.money -= this.priceB;
        }
        if(this.money >= this.priceC && this.timerC >= this.CooldownC && event.offsetX > this.positionX + 214 + 93*4 && event.offsetX < this.positionX +214+100 + 93*4 && event.offsetY > 230 && event.offsetY <326 )
        {

            this.cont.addmobs(1,this.ally);
            this.timerC = 0;
            this.money -= this.priceC;
        }
        if(this.money >= this.priceD && this.timerD >= this.CooldownD && event.offsetX > this.positionX + 214 + 93*6 && event.offsetX < this.positionX +214+100 + 93*6 && event.offsetY > 230 && event.offsetY <326 )
        {
  
        this.cont.addmobs(2,this.ally);
        this.timerD = 0;
        this.money -= this.priceD;
            
            
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
        Context.fillText("$" + this.priceA,this.positionX + 214,200);
        Context.rect(this.positionX + 214,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();
       
        

        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$" + this.priceB,this.positionX + 214 + 93*2,200);
        Context.rect(this.positionX + 214 + 93*2,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
         Context.drawImage(this.TigerI, 413, 243, 75, 75);
         Context.drawImage(this.BatI, 216, 240, 95, 70);
         
        Context.closePath();

        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
        Context.fillText("$" + this.priceC,this.positionX + 214 + 93*4,200);
        Context.rect(this.positionX + 214 + 93*4,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();
        Context.drawImage(this.LionI,588, 230, 95, 95);
        
        Context.beginPath();
        Context.font = "50px Arial"
        Context.fillStyle = "#000000"
<<<<<<< HEAD
        Context.fillText("$50 ",this.positionX + 214 + 93*6,200);
        
=======
        Context.fillText("$" + this.priceD,this.positionX + 214 + 93*6,200);
>>>>>>> ce965194be4875929eb907fd1407bf0b9418633d
        Context.rect(this.positionX + 214 + 93*6,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.drawImage(this.BearI, 777, 233, 90, 90);
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
   
    public CheckWin(cont:ControllerMobs)
    {
       
        return cont.checkWin();
        

    }
    public win(){
      return this.winCond;
    }
    
    public update()
    {
        
        const Canvas = GameContext.context.canvas;
        const Context = GameContext.context;
        this.positionX = Canvas.scrollLeft;
        this.cont.update();
        this.winCond = this.CheckWin(this.cont);
        this.timerA++;
        
        this.timerB++;
        
        this.timerC++;
        
        this.timerD++;

        this.enemyTimerA++;
        this.enemyTimerB++;
        this.enemyTimerC++;
        this.enemyTimerD++;
        if(this.timerA >= this.CooldownA)
        {
        this.a1 = .0;
        }
        else
        {
        this.a1 = .6;
        }
        if(this.timerB >= this.CooldownB)
        {
        this.a2 = .0;
        }
        else
        {
        this.a2 = .6;
        }
        if(this.timerC >= this.CooldownC)
        {
        this.a3 = .0;
        }
        else
        {
        this.a3 = .6;
        }

        if(this.timerD >= this.CooldownD)
        {
        this.a4 = .0;
        }
        else
        {
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
            if(this.enemyTimerA >= this.CooldownA && this.IAm >= this.priceA && rand == 0)
            {
                this.cont.addmobs(rand,1);
                this.enemyTimerA = 0;
                this.IAm -= this.priceA;

            }
            else if(this.enemyTimerB >= this.CooldownB && this.IAm >= this.priceB && rand == 1)
            {
                this.cont.addmobs(rand,1);
                this.enemyTimerB = 0;
                this.IAm -= this.priceB;
            }
            else if(this.enemyTimerC >= this.CooldownC && this.IAm >= this.priceC && rand == 3)
            {
                this.cont.addmobs(rand,1);
                this.enemyTimerC = 0;
                this.IAm -= this.priceC;
            }
            else if(this.enemyTimerD >= this.CooldownD && this.IAm >= this.priceD && rand == 2)
            {
                this.cont.addmobs(rand,1);
                this.enemyTimerD = 0;
                this.IAm -= this.priceD;
            }
            else{

            }
    }


};

export default HUD;