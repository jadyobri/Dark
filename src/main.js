//Jack O'Brien
//Rocket Patrol New Age
//20-30 hours
//increased ship speed after 30 seconds(1)
//full mouse control when playing(5)
//time increased by 1 each time ship taken out(5)
//2 player alternation(5)
//4 random sounds for explosion credited in comments above where implemented(3)
//timer on the right counting down(3)
//fire from original game(1)
//sound credit
//https://freesound.org/people/Prof.Mudkip/sounds/386862/
//https://freesound.org/people/InspectorJ/sounds/448226/
//https://freesound.org/people/n_audioman/sounds/320366/
 //https://freesound.org/people/n_audioman/sounds/276342/
//
//code credit:
//https://stackoverflow.com/questions/37408825/create-a-high-score-in-phaser
//https://www.html5gamedevs.com/topic/37506-pick-random-element/
//might have forgotten some, but these are the main ones
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

