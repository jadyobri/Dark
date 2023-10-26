//mods added
//increased ship speed after 30 seconds
//full mouse control when playing
//time increased by 1 each time ship taken out
//2 player alternation
//4 random sounds for explosion credited
//timer on the right counting down
//fire from original game
class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create(){
        //this.add.text(20, 20, "Rocket Patrol Menu");
       // this.scene.start("playScene");
       let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5
        },
        fixedWidth: 0
       }
    // show menu text
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

    //define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                fired: false

                //scored: this.scored
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                fired: false,
               // scored: this.scored

            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion1', './assets/448226__inspectorj__explosion-8-bit-01.wav');
        this.load.audio('sfx_explosion2', './assets/386862__profmudkip__8-bit-explosion.wav');
        this.load.audio('sfx_explosion3', './assets/320366__n_audioman__explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/276342__n_audioman__explosion56.wav')
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }


}
