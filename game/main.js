const IMAGES = [
    {name: 'box', src: 'img/box1.png'},
    {name: 'dvere', src: 'img/dvere.png'},
    {name: 'hviezda', src: 'img/hviezda.png'},
    {name: 'lava', src: 'img/lava.png'},
    {name: 'level', src: 'img/level.png'},
    {name: 'mainscreen', src: 'img/mainscreen.png'},
    {name: 'play', src: 'img/play.png'},
    {name: 'hrac', src: 'img/player2.png'},
    {name: 'hrac2', src: 'img/player1.png'},
    {name: 'podlozka', src: 'img/podlozkadlha.png'},
    {name: 'stena', src: 'img/stena.png'},
    {name: 'quit', src: 'img/quit.png'},
    {name: 'settings', src: 'img/setting.png'},
    {name: 'ozubenekoleso', src: 'img/nastavenia.png'},
    {name: 'levely', src:'img/levely.jpg'},
    {name: 'nastavenia', src:'img/nastaveniaBack.jpg'},
    {name: 'pozadie', src:'img/background.jpeg'},
    {name: 'deadscreen',src:'img/deadscreen.png'},
    {name: 'mute', src:'img/mute.png'},
    {name: 'unmute', src:'img/unmute.png'},
    {name: 'done', src:'img/done.png'}
];

const SOUNDS = [
    {name: 'hudba',src:'audio/africandrums.mp3',count: 1},
    {name: 'death', src: 'audio/death.mp3', count: 10},
];

const KEY_EVENT_TYPES = {

};

const MOUSE_EVENT_TYPES = {

};

class Game {

    constructor() {
        // Set up canvas for 2D rendering
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.time = Date.now();

        this.stateManager = new StateManager(resourceManager, this.ctx);
    }

    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
        this.stateManager.init();
        this.initEventSystem();
        this.startLoop();
    }

    initEventSystem() {
        this.canvas.addEventListener('click', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keypress', (ev) => {
            this.handleKeyEvent(ev);
        });
        this.canvas.addEventListener('keydown',(ev) => {
            this.handleKeyEvent(ev);
        });
    }
    handleKeyEvent(ev) {
        this.stateManager.handleKeyEvent(ev);
    }


    handleEvent(ev) {
        this.stateManager.handleEvent(ev);
    }

    // spusta nekonecnu sluzku
    startLoop() {
        this.time = Date.now();
        this.step();
    }

    // 
    step() {
        // console.log("Step");
      
        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100; // dt nadobuda hodnoty <0.15;az 0.33> 
        this.time = now;
      
        this.update(dt);
        this.render(dt);
      
        // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        requestAnimationFrame(() => this.step());
    }

    update(dt) {
        this.stateManager.update(dt);
    }

    // render len zobrazuje a obrazok sa nacita raz pri inicializacii
    render(dt) {
        this.clearCtx();
        this.stateManager.render(dt);
    }

    // cistenie som presunul do zvlast funkcie
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}