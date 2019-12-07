
export enum Level {
    Easy = 6,
    Medium = 5,
    Hard = 3,
  }

class IA{
    
    private frameCounter = 0;

    private first = false;

    


    public update()
    {
        
        this.frameCounter++;
        let rand = Math.floor(Math.random() * 10);
        if(this.frameCounter % 100 == 0)
            {
                return rand;                
            }
            return -1;
        
        
        
    }



};

export default IA;