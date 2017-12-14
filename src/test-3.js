/* eslint-disable no-debugger */

import 'pixi';
import { Phaser } from 'phaser';
import 'phaser-tilemap-plus';

import { FOV } from 'rot-js';
import { easeInQuad as easeFov, easeInCubic as easeFow } from './shared/utils';

// --------------------------------------------------

// choose map:
const MAP_NAME = 'generated_05';
// choose mode:
const MODE = 'fov'; // 'fov' (Field Of View) or 'fow' (Fog of War)

// --------------------------------------------------

const MAP = {
    hecatomb_01: {
        width: 32,
        height: 32,
    },
    hecatomb_02: {
        width: 32,
        height: 16,
    },
    enzo_01: {},
    enzo_02: {},
    generated_01: {},
    generated_02: {},
    generated_03: {},
    generated_04: {},
    generated_05: {},
    generated_06: {},
    generated_07: {},
}[MAP_NAME];

MAP.name = MAP_NAME;
MAP.width = MAP.width || 32;
MAP.height = MAP.height || 24;

const WIDTH = 11 * MAP.width;
const HEIGHT = 11 * MAP.height;

const VIEW_DISTANCE = MODE === 'fov' ? 10 : 10;
const FOG_TILE_INDEX = 50;
const PLAYER_TILE_INDEX = 40;

const EASING_FUNCTION = MODE === 'fov' ? easeFov : easeFow;

// ==================================================

class Game {
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(WIDTH, HEIGHT, WIDTH * 3, HEIGHT * 3);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        this.world.scale = new Phaser.Point(2, 2);
    }

    preload() {
        this.game.plugins.add(Phaser.Plugin.TilemapPlus);

        this.load.tilemap(
            'Tilemap',
            `assets/maps/${MAP.name}.json`,
            null,
            Phaser.Tilemap.TILED_JSON,
        );

        this.load.image('Tileset', 'assets/maps/hecatomb.png');
    }

    create() {
        this.tilemap = this.add.tilemap('Tilemap');

        this.tilemap.addTilesetImage('hecatomb', 'Tileset');

        this.groundLayer = this.tilemap.createLayer('Ground');
        this.itemsLayer = this.tilemap.createLayer('Items');
        this.monstersLayer = this.tilemap.createLayer('Monsters');
        this.fovLayer = this.tilemap.createLayer('FOV');

        this.groundLayer.resizeWorld();

        this.tilemap.setCollisionBetween(11, 17, true, this.groundLayer);
        this.tilemap.setCollisionBetween(41, 49, true, this.groundLayer);

        this.tilemap.plus.animation.enable();

        // --- FOV

        // this.FOV = new FOV.PreciseShadowcasting((x, y) => {
        this.FOV = new FOV.RecursiveShadowcasting((x, y) => {
            const tile = this.tilemap.getTile(x, y, this.groundLayer);
            return (
                !tile || (!tile.properties.collides && !tile.properties.secret)
            );
        });

        // crude "player"
        const playerTile =
            this.tilemap.searchTileIndex(40, 0, false, this.monstersLayer) ||
            {};
        this.playerX = playerTile.x || 0;
        this.playerY = playerTile.y || 0;
        this.tilemap.removeTile(playerTile.x, playerTile.y, this.monstersLayer);

        this.fovAtPlayerXY();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let moved = false;

        // crude horizontal "movement"
        const oldPlayerX = this.playerX;
        const oldPlayerY = this.playerY;

        if (this.cursors.left.justDown) {
            this.playerX = Math.max(0, this.playerX - 1);
            moved = true;
        } else if (this.cursors.right.justDown) {
            this.playerX = Math.min(this.tilemap.width - 1, this.playerX + 1);
            moved = true;
        }

        // crude vertical "movement"
        if (this.cursors.up.justDown) {
            this.playerY = Math.max(0, this.playerY - 1);
            moved = true;
        } else if (this.cursors.down.justDown) {
            this.playerY = Math.min(this.tilemap.height - 1, this.playerY + 1);
            moved = true;
        }

        // has moved?
        if (moved) {
            // crude player/tile "collision"
            const groundTile = this.tilemap.getTile(
                this.playerX,
                this.playerY,
                this.groundLayer,
            );

            if (
                groundTile &&
                groundTile.properties.collides &&
                // "secret" tiles can be passed through
                !groundTile.properties.secret
            ) {
                this.playerX = oldPlayerX;
                this.playerY = oldPlayerY;
            }

            // crude item "pickup"
            const itemsTile = this.tilemap.getTile(
                this.playerX,
                this.playerY,
                this.itemsLayer,
            );

            // keys: 23-27
            // spear: 28
            // dagger: 29
            // money: 30
            if (itemsTile && itemsTile.index >= 23 && itemsTile.index <= 30) {
                this.tilemap.removeTile(
                    this.playerX,
                    this.playerY,
                    this.itemsLayer,
                );

                if (itemsTile.index >= 23 && itemsTile.index <= 27) {
                    // NOTE: tilemap-plus' animated tiles are hanging around, so remove thisanimated location from its array

                    const anim = this.tilemap.plus.animation.tileAnimations.find(
                        animation => animation.frames[0].tileId === 22,
                    );
                    const ind = anim.tileLocations.findIndex(
                        location =>
                            location.x === this.playerX &&
                            location.y === this.playerY,
                    );

                    anim.tileLocations.splice(ind, 1);
                }
            }

            if (oldPlayerX !== this.playerX || oldPlayerY !== this.playerY) {
                // re-generate FOV layer!
                this.fovAtPlayerXY();
            }
        }
    }

    fovAtPlayerXY() {
        this.tilemap.fill(
            FOG_TILE_INDEX,
            0,
            0,
            this.tilemap.width,
            this.tilemap.height,
            this.fovLayer,
        );

        if (MODE === 'fov') {
            this.tilemap.forEach(
                tile => {
                    // eslint-disable-next-line no-param-reassign
                    tile.alpha = 1;
                },
                this,
                0,
                0,
                this.tilemap.width,
                this.tilemap.height,
                this.fovLayer,
            );
        }

        this.FOV.compute(
            this.playerX,
            this.playerY,
            VIEW_DISTANCE,
            (x, y, r) => {
                const tile = this.tilemap.getTile(x, y, this.fovLayer);
                if (tile) {
                    const newAlpha = EASING_FUNCTION(r, 0, 1, VIEW_DISTANCE);
                    if (MODE === 'fov' || newAlpha < tile.alpha) {
                        tile.alpha = newAlpha;
                    }
                }
            },
        );

        this.tilemap.putTile(
            PLAYER_TILE_INDEX,
            this.playerX,
            this.playerY,
            this.fovLayer,
        ).alpha = 1;
    }
}

const test3 = new Phaser.Game({
    width: WIDTH * 2,
    height: HEIGHT * 2,
    renderer: Phaser.AUTO,
    antialias: false,
});

test3.state.add('Game', Game, true);
