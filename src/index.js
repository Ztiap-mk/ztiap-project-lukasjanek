import Hrac from 'hrac1';

let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 800;

ctx.clearRect(0,0,1000,800);

let hrac = new Hrac(GAME_WIDTH,GAME_HEIGHT);
hrac.draw(ctx);
/*let lastTime = 0;
function gameLoop(timestamp){
    let deltaTime = timestamp -lastTime;
    lastTime= timestamp;

    ctx.clearRect(0,0,1000,800);
    ctx.fillStyle = '#000';
    ctx.fillRect(0,750,1000,50);
    hrac.update(deltaTime);
    hrac.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();*/
