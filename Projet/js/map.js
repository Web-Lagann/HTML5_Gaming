var map;
var player;
var cursors;
var groundLayer, coinLayer;
var score = 0;
var text;
var jump;
var coinS;

class Map extends Phaser.Scene {

    constructor() {
        super({
            key: "Map"
        })
    }

    preload() {

        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        this.load.image('coin', 'assets/coinGold.png');
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.audio('jump', 'audio/Mario-jump-sound.mp3')
        this.load.audio('coinS', 'audio/Mario-coin-sound.mp3')
    }

    create() {

        //map
        map = this.make.tilemap({key: 'map'});

        var groundTiles = map.addTilesetImage('tiles');
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        groundLayer.setCollisionByProperty({collides: true});

        // coin
        var coinTiles = map.addTilesetImage('coin');
        coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // create player
        player = this.physics.add.sprite(200, 200, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setSize(player.width, player.height - 8);

        this.physics.add.collider(groundLayer, player);

        coinLayer.setTileIndexCallback(17, collectCoin, this);

        this.physics.add.overlap(player, coinLayer);

        jump = this.sound.add('jump');
        coinS = this.sound.add('coinS');

        // player animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBackgroundColor('#ccccff');

        text = this.add.text(20, 570, 'Score : 0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        text.setScrollFactor(0);
    }

    update() {
        if (cursors.left.isDown) {
            player.body.setVelocityX(-200);
            player.anims.play('walk', true);
            player.flipX = true;
        }
        else if (cursors.right.isDown) {
            player.body.setVelocityX(200);
            player.anims.play('walk', true);
            player.flipX = false;
        }
        else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }

        if (cursors.up.isDown && player.body.onFloor()) {
            player.body.setVelocityY(-500);
            jump.play();
        }
        if (score === 18) {
            this.scene.start("Icelevel")
        }
    }
}

function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y);
    score ++;
    text.setText('Score : '+score);
    coinS.play();
    return false;
}
