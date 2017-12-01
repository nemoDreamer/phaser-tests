import 'pixi';
import Phaser from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import Title from './states/title';

const WIDTH = 1200;
const HEIGHT = 800;
const RENDER_MODE = Phaser.AUTO;
const CONTAINER = '';
const GAME = new Phaser.Game(WIDTH, HEIGHT, RENDER_MODE, CONTAINER);

GAME.state.add('boot', Boot);
GAME.state.add('preload', Preload);
GAME.state.add('title', Title);

GAME.state.start('boot');
