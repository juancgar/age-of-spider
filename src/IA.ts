import { State } from "./Lion";

export enum Level {
    Easy = 6,
    Medium = 5,
    Hard = 3,
  }

class IA{
    
    private frameCounter = 0;

    private first = false;

    private Level:Level;
    constructor(Level:Level)
    {
        this.Level = Level;
    }


    public update()
    {
        console.log(this.Level)
        this.frameCounter++;
        let rand = Math.floor(Math.random() * this.Level);

        if(this.frameCounter % 100 == 0)
            {
                return rand;                
            }
            return -1;
        
        
        
    }



};

export default IA;