import GameContext from "./GameContext";
import image3 from "../assets/mountain.png"
import image2 from "../assets/layer.png"
import image1 from "../assets/back.png"



class background
{

private image = new Array();

constructor(){

   this.image[0] = new Image();
   this.image[0].src = image1;
   this.image[1] = new Image();
   this.image[1].src = image2;

   this.image[2] = new Image();
   this.image[2].src = image3;




}
public render()
{
    
    const Canvas = GameContext.context.canvas;

    const height = Canvas.height;
    const width = Canvas.width;

    const Context = GameContext.context;

    Context.beginPath();
  
    var Iheight = this.image[0].naturalHeight;
    var Iwidth = this.image[0].naturalWidth;


     var finalW = (Iwidth * height)/ Iheight;
     var finalH = height;

     Context.drawImage(this.image[0],300,0,finalW,finalH);
     Context.drawImage(this.image[0],-1240,0,finalW,finalH);
     Context.drawImage(this.image[0],1040,0,finalW,finalH);
     Context.drawImage(this.image[0],2000,0,finalW,finalH);
     
     Iheight = this.image[2].naturalHeight;
     Iwidth = this.image[2].naturalWidth;
     finalW = (Iwidth * height)/ Iheight;
     finalH = height;
     Context.drawImage(this.image[2],0,100,finalW,finalH);
     Context.drawImage(this.image[2],1240,100,finalW,finalH);
     Context.drawImage(this.image[2],-1240,100,finalW,finalH);
      
     
     Context.drawImage(this.image[1],0,0,finalW,finalH);
     Context.drawImage(this.image[1],1240,0,finalW,finalH);
     Context.drawImage(this.image[1],-1240,0,finalW,finalH);

   


     Context.closePath();

    


   
}





};
export default background;