//SpaceShip prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }
    update() {
        //console.log(play.timer);
        // if(this.timer == 30){
        //     this.moveSpeed++;
        // }
       // console.log();
       console.log(game.settings.spaceshipSpeed);
        this.moveSpeed = game.settings.spaceshipSpeed;
        //console.log(this.moveSpeed);
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.reset();
           // this.x = game.config.width;
        }
    }
    reset(){
        this.x = game.config.width;
    }
}

