const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 600, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");
}

function create() {
    // Runs once, after all assets in preload are loaded
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
}

function update(time, delta) {
    // Runs once per frame for the duration of the scene
}