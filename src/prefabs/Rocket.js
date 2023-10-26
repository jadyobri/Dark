//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // Add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.pointer = game.input.activePointer;
        this.xed = this.pointer.x;
        //set rocket to pointer
        //this.yed = this.pointer.y;
        //theyare listening repo
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        //this.input.on('pointerdown, (...))
    }
    // create() {
    //     this.input.on('pointerdown',() => {
    //         this.isFiring = true;
    //         this.sfxRocket.play();
    //     },this);
    // }
    update() {
        if(!this.isFiring) {
            if((keyLEFT.isDown) && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
                //this.xed = this.pointer.x;
                
            } else if((keyRIGHT.isDown)&& this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
               // this.xed = this.pointer.x;
            }
            else if ((this.pointer.x >= borderUISize + this.width) && (this.pointer.x <= game.config.width - borderUISize - this.width)){//&&(this.pointer.x >= borderUISize + this.width)){//||((this.x <= game.config.width - borderUISize - this.width)&&(this.pointer.x <= game.config.width - borderUISize - this.width))){
                if(this.xed != this.pointer.x){
                this.x = this.pointer.x;
                this.xed = this.pointer.x;
            }
        }
        // else if((this.x <= game.config.width - borderUISize - this.width)&&(this.pointer.x <= game.config.width - borderUISize - this.width)){
        //     this.x = this.pointer.x;
        // }
    }

        if(Phaser.Input.Keyboard.JustDown(keyF) || game.settings.fired) {
           // this.fire.setVisible(true);
            this.isFiring = true;
            this.sfxRocket.play();
            game.settings.fired = false;
        }

        // else{
        //    // this.fire.setVisible(false);
        // }

        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }

        if(this.y <= borderUISize * 3 + borderPadding) {
           this.isFiring = false;
           // this.y = game.config.height = borderUISize - borderPadding;
            this.reset();
        }
    }
    reset() {
          // fire button

  if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
    this.isFiring = true;
   //this.fire.setVisible(true);
    this.sfxRocket.play();  // play sfx
  }
    // this.fire.setVisible(false);
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}