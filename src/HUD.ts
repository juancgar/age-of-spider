import GameContext from "./GameContext";
import image from "../assets/HUD.png";


class HUD {


    private HUD = new Image;
    public positionX: number = -50;
    private color = "#A4A5A3";
    ///alphas for each button
    private a1 = 0;
    private a2 = 0;
    private a3 = 0;
    private a4 = 0;

    private stateBoton1 = false;
    private stateBoton2 = false;
    private stateBoton3 = false;
    private stateBoton4 = false;
    private backColor = "green"
    constructor()
    {
        this.HUD.src = image;


    }
    public mouseDownListener = (event: MouseEvent) => {
        console.log(event.offsetX);
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
        }
    };
    public render()
    {

    
        const Context = GameContext.context;
        
        Context.beginPath();
        Context.restore();
        Context.save();

        Context.drawImage(this.HUD,this.positionX,-Context.canvas.height/3,Context.canvas.width/2,Context.canvas.width/2);
        Context.closePath();

       // background rectanlges
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

    }

    public update(x:number)
    {
        const Canvas = GameContext.context.canvas;
        const Context = GameContext.context;
        this.positionX = Canvas.scrollLeft;
        
        
        
    }


};

export default HUD;