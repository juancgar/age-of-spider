import GameContext from "./GameContext";

import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";


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
   this.image[3] = new Image();
   this.image[3].src = image4;
   this.image[4] = new Image();
   this.image[4].src = image5;



}
public render()
{
    
    const Canvas = GameContext.context.canvas;

    const height = Canvas.height;
    const width = Canvas.width;

    

     
    
    const Context = GameContext.context;


    
    for(let i = 0; i < 5; i++)
    {
    Context.beginPath();
  
    var Iheight = this.image[i].naturalHeight;
     var Iwidth = this.image[i].naturalWidth;


     var finalW = (Iwidth * height)/ Iheight;
     var finalH = height;

     Context.drawImage(this.image[i],0,0,finalW,finalH);

     Context.closePath();
    }


   
}





};
export default background;