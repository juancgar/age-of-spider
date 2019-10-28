import GameContext from "./GameContext";
import image from "../assets/HUD.png";
import ControllerMobs from "./ControllerMobs";
import IA from "./IA";
import engine from "./Engine";
import Pause from "./Scene/Pause";
import Scene from "./Scene/Playing";
import Playing from "./Scene/Playing";
class HUD {


    private HUD = new Image;
    public positionX: number = -50;
    private color = "#A4A5A3";
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

    private stateBoton1 = false;
    private stateBoton2 = false;
    private stateBoton3 = false;
    private stateBoton4 = false;
    private stateBoton5 = true;
    private backColor = "green"

    constructor()
    {
        
        this.HUD.src = image;
        this.cont = new ControllerMobs();
        this.IA = new IA();
    }
    public mouseDownListener = (event: MouseEvent) => {
        
        if(event.offsetX > this.positionX +214 && event.offsetX < this.positionX +214+100 && event.offsetY > 230 && event.offsetY <326 )
        {
            if(this.stateBoton1){
                this.a1 = .6;
                this.stateBoton1 = false;
            }
            else{
                this.a1 = 0;
                this.stateBoton1 = true;
            }
            this.cont.addmobs(0,this.ally);
        }

        if(event.offsetX > this.positionX + 214 + 93*2 && event.offsetX < this.positionX +214+100 + 93*2 && event.offsetY > 230 && event.offsetY <326 )
        {
            if(this.stateBoton2){
                this.a2 = .6;
                this.stateBoton2 = false;
            }
            else{
                this.a2 = 0;
                this.stateBoton2 = true;
            }
            this.cont.addmobs(2,this.ally);
        }
        if(event.offsetX > this.positionX + 214 + 93*4 && event.offsetX < this.positionX +214+100 + 93*4 && event.offsetY > 230 && event.offsetY <326 )
        {
            if(this.stateBoton3){
                this.a3 = .6;
                this.stateBoton3 = false;
            }
            else{
                this.a3 = 0;
                this.stateBoton3 = true;
            }
            this.cont.addmobs(1,this.ally);
        }
        if(event.offsetX > this.positionX + 214 + 93*6 && event.offsetX < this.positionX +214+100 + 93*6 && event.offsetY > 230 && event.offsetY <326 )
        {
            
            if(this.stateBoton4){
                this.a4 = .6;
                this.stateBoton4 = false;
            }
            else{
                this.a4 = 0;
                this.stateBoton4 = true;
            }
        this.cont.addmobs(3,this.ally);
            
            
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
        Context.rect(this.positionX + 214,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();

        

        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*2,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        
        Context.closePath();

        Context.beginPath();
        Context.rect(this.positionX + 214 + 93*4,230,100,96);
        Context.fillStyle = this.backColor;
        Context.fill();
        Context.closePath();

        Context.beginPath();
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

        
    }

    public update()
    {
        
        const Canvas = GameContext.context.canvas;
        const Context = GameContext.context;
        this.positionX = Canvas.scrollLeft;
        this.cont.update();
    
        let rand = this.IA.update();
        console.log(rand);
        if(rand <= 3 && rand >= 0)
            this.cont.addmobs(rand,1);
        
        
    }


};

export default HUD;