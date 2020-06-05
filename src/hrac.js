export default class hrac{
    constructor(){
        this.image = document.getElementById("player");
    }
    draw(ctx){
        ctx.drawImage(this.image,0,595);
    }
    update(){

    }
}