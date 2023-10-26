class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.timesplayed = 0;
        this.player1 = 0;
        this.player2 = 0;
        
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
       
        //load spritesheet

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
       // console.log("gots");
    
    }
    create(){
        //this.add.text(20, 20, "Rocket Patrol Play");
        //game.stage.backgroundColor = '#000';
        //this.checker = game.time.create(false);
        //green UI background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

       // check = game.time.create(false);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
       // this.checker.loop(1000, )
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        //define keys
        //leftClick = this.input.keyboard.addKey(Phaser.Input.)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
// initialize score
        this.p1Score = 0;
//           // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 100

        }
        let timingConfig = {
            fontFamily: 'Courier',
            fontSize:'28px',
            backgroundColor: '#F3B141',
            color:'#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timer = game.settings.gameTimer/1000;
        this.timeElapsed = 0;
        //timer = gameTime/1000;
        // if(gameTime == 60000){
        //     timer = 60;
        // }
        // else{
        //     timer = 45;
        // }
       // this.checker.loop(1000, this.timer--, this);

       this.timeless = this.add.text(borderUISize + borderPadding*40, borderUISize + borderPadding*2, this.timer, timingConfig);
        this.time.addEvent({delay: 1000, callback: ()=>{this.timer--;this.timeElapsed++;
        if(this.timeElapsed == 30){
            game.settings.spaceshipSpeed++;
           // console.log('here');
        }}, loop: true});
       // this.checker.loop(1000, this.add.text( borderUISize + borderPadding*40, borderUISize + borderPadding*2, this.timer--, timingConfig),this);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
         this.fire = this.add.text(borderUISize + borderPadding*20, borderUISize + borderPadding*2, 'Fire', fireConfig).setVisible(false);
        //this.fire.setVisible(false);
        this.gameOver = false;
        if(!this.gameOver){
            this.input.on('pointerdown', ()=>{
     
             game.settings.fired = true;
           })
         }
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        if(localStorage.getItem("player1")==null){
            //this.timesplayed++;
            //this.gameOver = true;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Ready Player2: Press (R) to Restart', scoreConfig).setOrigin(0.5);

                localStorage.setItem("player1", this.p1Score)
                //this.player1 += this.p1Score;
                // if(Phaser.Input.Keyboard.JustDown(keyR)){
                //     this.timer = game.settings.gameTimer/1000;
                //     this.timeElapsed = 0;
                //     this.timesplayed++;
                //     this.gameOver = false;
                // }
                //this.gameOver = true;
            }, null, this);
            
            
        }
        else{
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if(localStorage.getItem("player 1") > this.p1Score){
            this.add.text(game.config.width/2, game.config.height/2, 'Player 1 Wins!', scoreConfig).setOrigin(0.5);
            }
            else{
                this.add.text(game.config.width/2, game.config.height/2, 'Player 2 Wins!', scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            localStorage.setItem("player 1", null);
        }, null, this);
    }

}

    update() {
          // check key input for restart
//   if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
//     this.scene.restart();
// }    

//this.moveSpeed++;
        //console.log(this.pointer.x);
        //console.log(this.p1Rocket.y);
        if(this.p1Rocket.y < (game.config.height - borderUISize - borderPadding)){
            this.fire.setVisible(true);
        }
        else{
            this.fire.setVisible(false);
        }
        // let losstime = 0;
        // //this.time.addEvent({delay: 1000, })
        // if((this.timer == 30) && (losstime == 0)){
        //     game.settings.spaceshipSpeed++;
        //     losstime++;

        // }
        // if(Phaser.Input.Keyboard.JustDown(keyF)){
        //     this.fire.setVisible(true);
        // }
        // else{
        //     this.fire.setVisible(false);
        // }
        //idea from: https://gamedev.stackexchange.com/questions/182242/phaser-3-how-to-trigger-an-event-every-1-second
        //this.timer+=delta;
        //console.log(time*.001);
        //this.timer+=delta;
       // let origintime = this.timer.text;
        
        //let answer = this.timer;
        //console.log(delta);
        // this.checker+= delta
        // console.log(this.checker);
       // while(this.checker > 1000){
            
            //let fixtime = this.timer*1000 - game.settings.gameTime;
        //    this.checker -= 1000;
            //this.timeless.text = this.timer;
            //console.log(this.timer);
       // }
       // console.log(this.checker);
        //this.timer = 
        //this.timeless.text = this.timer;
        // this.checker = 0;
        //this.timer -= 1;
        //this.timeless.text = this.time.delayedCall(1000, this.timer, null, this);
        //this.timer = 
        //console.log(this.timer);
       // console.log(this.isFiring);
        // if(this.isFiring == true){
        //     this.fire.setVisible(true);
        // }
        // else{
        //     this.fire.setVisible(false);
        // }
        if(this.timer >= 0){
            this.timeless.text = this.timer;
        }
        else{
            this.time.loop = false;
        }
        // else{
        //     this.
        // }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            //this.scene.restart();
            
            this.scene.start("menuScene");
        }
        // else if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
        //     this.timer = game.settings.gameTimer/1000;
        //     this.timeElapsed = 0;
        //     this.timesplayed++;
        //     this.gameOver = false;
        //     this.clock.text.setVisible(false);
        //     //this.clock.destroy();
        // }
        // else if (Phaser.Input.Keyboard.JustDown(keyR)){
        //     this.gameOver = false;
        // }
        this.starfield.tilePositionX -= 4;
        

        //update spaceships(x3)
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.timer+=1;
            this.clock.delay+=1000;
            this.shipExplode(this.ship03);
            //this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.timer+=1;
            this.clock.delay+=1000;
           // this.ship02.reset();
           this.shipExplode(this.ship02);
            //console.log('kaboom ship 02');
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
           this.p1Rocket.reset();
           this.timer+=1;
           this.clock.delay+=1000;
           this.shipExplode(this.ship01);
           //this.ship01.reset();
            //console.log('kaboom ship 01');
        }
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
    }
    // timeLines() {
    //     this.timer--;
        
    // }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }else{
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //sound credit
        //https://freesound.org/people/Prof.Mudkip/sounds/386862/
        //https://freesound.org/people/InspectorJ/sounds/448226/
        //https://freesound.org/people/n_audioman/sounds/320366/
        //https://freesound.org/people/n_audioman/sounds/276342/
        this.sound.play(Phaser.Math.RND.pick(['sfx_explosion', 'sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4']));       
    }
}