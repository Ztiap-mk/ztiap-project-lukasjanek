// toto je viac menej bez zmeny len som sa zbavil globalnych premennych
// pridal ctx parameter do draw
// https://html5.litten.com/understanding-save-and-restore-for-the-canvas-context/
class Box {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('box');
    
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.rotation = 0
    }
  
    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }
        if (this.y < 0) {
            this.y = 0
            this.dy = Math.abs(this.dy) * 0.95
        }
    
        // Movement
        this.x += this.dx * dt
        this.y += 0 * dt
        this.rotation +=dt/3
    }
  
    // Render self
    render(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.drawImage(this.image, -20, -20, 50, 50)
      ctx.restore()
    }
}

class Hrac {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('hrac');
    
        this.x = 0;
        this.y = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.width = 40;
        this.height = 70;
        this.gravity = 0.5;
        this.jumping = false;
    }


    key1(ev) {
          if ((isKeyDownEvent(ev) && ev.keyCode === 37 ) || (isKeyDownEvent(ev) && ev.keyCode === 65)) {
              this.x1 = -10;
              this.image = resourceManager.getImageSource('hrac2');
              if(this.x < 0) //neprejde za herne pole
              {
                this.x1=0;
              }
              console.log("LEFT");
        }
          if ((isKeyDownEvent(ev) && ev.keyCode ===39) || (isKeyDownEvent(ev) && ev.keyCode === 68)) {
             this.x1 = 10;
             this.image = resourceManager.getImageSource('hrac');
             if(this.x > 1150) //neprejde za herne pole 
             {
                 this.x1 = 0;
             }
              console.log("RIGHT");
          }
          if ((isKeyDownEvent(ev) && ev.keyCode ===32) && this.jumping == false) {
            this.jumping = true;  
            this.y1 = -10;
            console.log("SPACE");
              
          }

    }
    move(dt) {
        this.y += this.gravity;
        this.x += this.x1;
        this.y += this.y1;
        this.x1 = 0;
        this.y1 = 0;
    }
    render(ctx) {
        ctx.save()
        if(this.y > 750-50-70)
        {
            this.jumping = false;
            this.y = 750-50-70;
        }
        ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 10, 650, this.width,this.height);
        ctx.restore()
    }

}

class Background {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pozadie');
    
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}

class podlozka {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('podlozka');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 720,1200,50);
        ctx.restore()
    }

}

class stena {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}

class stena1 {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}

class stena2 {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}

class stena3 {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}

class stena4 {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}

class stena5 {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('stena');
    
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    render(ctx) {
        ctx.save()
        //ctx.translate(this.x,this.y);
        ctx.drawImage(this.image, 0, 600,500,50);
        ctx.restore()
    }

}