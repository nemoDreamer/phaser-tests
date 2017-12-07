import 'pixi';
import Phaser from 'phaser';

class Game {
    create() {
        console.log('this', this);
    }
}

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Game', Game, true);
