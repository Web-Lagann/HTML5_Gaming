var map;
var player;
var cursors;
var groundLayer, plateformLayer, coinLayer;
var score = 0;
var text;
var jump;

class Mushroom extends Phaser.Scene {

    constructor() {
        super({
            key: "Mushroom"
        })
    }

    preload() {

        this.load.tilemapTiledJSON('mushroom', 'assets/mushroomland.json');
        this.load.spritesheet('spritesheet', 'assets/spritesheet.png', {frameWidth: 70, frameHeight: 70});
        this.load.image('coinGold', 'assets/coinGold.png');
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.audio('jump', 'audio/Mario-jump-sound.mp3')
    }

    create() {

        //map
        map = this.make.tilemap({key: 'mushroom'});

        var groundTiles = map.addTilesetImage('tiles');
        var plateTiles = map.addTilesetImage('spritesheet');
        map.createDynamicLayer('background', plateTiles, 0, 0);
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        plateformLayer = map.createDynamicLayer('plateform', plateTiles, 0, 0);
        groundLayer.setCollisionByProperty({collides: true});
        plateformLayer.setCollisionByProperty({collides: true});

        // coin
        score = 0;
        var coinTiles = map.addTilesetImage('coinGold');
        coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // create player
        player = this.physics.add.sprite(100, 100, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setSize(player.width, player.height - 8);

        this.physics.add.collider(groundLayer, player);
        this.physics.add.collider(plateformLayer, player);

        coinLayer.setTileIndexCallback(66, collectCoin, this);

        this.physics.add.overlap(player, coinLayer);

        jump = this.sound.add('jump');

        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBackgroundColor('#ccccff');

        text = this.add.text(20, 570, 'Score : 0', {
            fontSize: '20px',
            fill: '#000000'
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
         if (score === 47) {
            this.scene.start("Candy")
        }
    }
}
