const STATES = {
    SPLASH: 'splashScreenState',
    GAME: 'gameState',
    MAIN_MENU: 'mainMenu',
    SETTINGS: 'settings',
    GAMEOVER: 'gameOver',
    LEVELS : 'levels'
}

class StateManager {
    states = {};
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }

    init() {
        const ctx = this.ctx;
        this.states = {
            splashScreenState: new SplashScreenState(this, ctx),
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            settings: new Settings(this, ctx),
            gameOver : new GameOver(this,ctx),
            levels : new Levels(this,ctx)
        };
        this.currentState = this.states.splashScreenState;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState = newState;
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }
    handleKeyEvent(ev) {
        this.currentState.handleKeyEvent(ev);
     }

    // handleMouseEvent(e) {
    //     this.currentState.handleMouseEvent(e);
    // }

    render() {
        this.currentState.render(this.ctx);
    }
}

class BaseState {

    objects = [];
    pole=[

    ];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }

    render() {
        // TODO pridat logiku pre zoradovanie objektov, ktory sa ma prvy zobrazit
        this.objects.forEach(object => object.render(this.ctx));
        this.pole.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }

    // handleMouseEvent(e) {

    // }

     handleKeyEvent(ev) {

     }
}

class SplashScreenState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const startButton = new ImageButton(0, 0, 1200, 750, resourceManager.getImageSource('mainscreen'));
        startButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            startButton,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}


class GameState extends BaseState {
    pole = [];
    poleHrac=[];
    poleStaticke=[];
    constructor(manager, ctx) {
        super(manager, ctx);

        this.background = resourceManager.getImageSource('pozadie');
        this.player = resourceManager.getImageSource('hrac');
        this.sound = resourceManager.getSoundSource('hudba');
        this.done = resourceManager.getImageSource('done');
        this.ozubenekoleso = resourceManager.getImageSource('ozubenekoleso');
        this.zvuk = resourceManager.getImageSource('unmute');

        this.z=0;

        const soundButton = new ImageButton(40, 40, 100, 50, resourceManager.getImageSource('unmute'));
        soundButton.onClick((ev) => {
            if((this.z)%2==0)
            {
                this.zvuk = resourceManager.getImageSource('mute');
                this.sound.pause();
                this.z++;
            }
            else
            {
                this.zvuk = resourceManager.getImageSource('unmute');
                this.sound.play();
                this.z++;
            }
        });

        const gamedone = new ImageButton(1100, 500, 100, 50, resourceManager.getImageSource('done'));
        gamedone.onClick((ev) => {
            this.stateManager.changeState(STATES.GAMEOVER);
        });
        // const nastavenia = new ImageButton(1130, 20, 50, 50, resourceManager.getImageSource('ozubenekoleso'));
        // nastavenia.onClick((ev) => {
        //     this.stateManager.changeState(STATES.SETTINGS);
        // });
        this.pole = [
            soundButton,
            gamedone
            //nastavenia
        ];
         for (let i = 0; i < 5; i++) {
            this.objects.push(new Box());
        }
        this.poleHrac.push(new Hrac());
        this.poleStaticke.push(new podlozka());
        this.poleStaticke.push(new stena());
    }

    handleEvent(ev) {
        this.pole.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }

    handleKeyEvent(ev) {
        this.poleHrac.forEach((object) => {
            object.key1(ev);
            console.log(ev);
        });

    }

    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
        this.poleHrac.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.background,0,0,1200,750);
        //this.ctx.drawImage(this.player,100,600,50,75);
        this.ctx.drawImage(this.zvuk,40,40,100,50);
        this.ctx.drawImage(this.done,1100, 700, 100, 50);
        //this.ctx.drawImage(this.ozubenekoleso,1130, 20, 50, 50);
        this.objects.forEach(object => object.render(this.ctx));
        this.poleHrac.forEach((object) => {
            object.render(this.ctx);
        });
        this.poleStaticke.forEach((object) => {
            object.render(this.ctx);
        });
    }

    
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.sound = resourceManager.getSoundSource('hudba');
        const playButton = new ImageButton(0, 0, 1200, 230, resourceManager.getImageSource('play'));
        playButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
            this.sound.play();
        });
        const levelButton = new ImageButton(0, 230, 1200, 150, resourceManager.getImageSource('level'));
        levelButton.onClick((ev) => {
            this.stateManager.changeState(STATES.LEVELS);
        });
        const settingsButton = new ImageButton(0, 380, 1200, 150, resourceManager.getImageSource('settings'));
        settingsButton.onClick((ev) => {
            this.stateManager.changeState(STATES.SETTINGS);
        });
        const quitButton = new ImageButton(0, 530, 1200, 368, resourceManager.getImageSource('quit'));
        quitButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
         });

        this.objects = [
            playButton,
            levelButton,
            settingsButton,
            quitButton
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class Levels extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const level = new ImageButton(0, 0, 1200, 750, resourceManager.getImageSource('levely'));
        level.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            level,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class Settings extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const nastav = new ImageButton(0, 0, 1200,750, resourceManager.getImageSource('nastavenia'));
        nastav.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            nastav,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class GameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const death = new ImageButton(0, 0, 1200, 750, resourceManager.getImageSource('deadscreen'));
        death.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            death,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}