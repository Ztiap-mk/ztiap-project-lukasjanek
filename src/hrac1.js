export default class Hrac{
    constructor(gameWidth,gameHeight){
        
        this.image = document.getElementById("player");
        this.width = 20;
        this.height = 25;
       

        this.position = {
            x: gamewidth - this.width,
            y: gameHeight - this.height - 10,
        }
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height); //ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
    /*update(deltaTime){
        if(!deltaTime) return;
        this.position.x +=5 /deltaTime;
    }*/
}