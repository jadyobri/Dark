//Jack O'Brien
//mods added
//Implement the speed increase that happens after 30 seconds in the original game (1)
//Implement mouse control for player movement and mouse click to fire (5)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits [Hint: use this.timer.addEvent()] (5)
//Implement an alternating two-player mode (5)
//Create 4 new explosion sound effects and randomize which one plays on impact (3)
//Display the time remaining (in seconds) on the screen (3)
//Implement the 'FIRE' UI text from the original game (1)
//console.log("hello world");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

