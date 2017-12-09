/* eslint-disable no-debugger */

import 'pixi';
import { Phaser } from 'phaser';
import 'phaser-tilemap-plus';

const width = 11 * 32;
const height = 11 * 32;

class Game {
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(width, height, width * 2, height * 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        this.world.scale = new Phaser.Point(2, 2);
    }

    preload() {
        this.game.plugins.add(Phaser.Plugin.TilemapPlus);

        this.load.tilemap(
            'Tilemap',
            'assets/maps/hecatomb_01.json',
            null,
            Phaser.Tilemap.TILED_JSON,
        );

        this.load.image('Tileset', 'assets/maps/hecatomb.png');
    }

    create() {
        this.tilemap = this.add.tilemap('Tilemap');
        this.tilemap.addTilesetImage('hecatomb', 'Tileset');

        this.ground = this.tilemap.createLayer('Ground');
        this.ground.resizeWorld();

        this.items = this.tilemap.createLayer('Items');
        this.monsters = this.tilemap.createLayer('Monsters');

        this.tilemap.plus.animation.enable();
    }
}

const game = new Phaser.Game({
    width: width * 2,
    height: height * 2,
    renderer: Phaser.AUTO,
    antialias: false,
});

game.state.add('Game', Game, true);
