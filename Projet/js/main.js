var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: true
        }
    },
    scene: [
        Map,
        Icelevel,
        Mushroom,
        Candy,
        Industrial
    ],
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

