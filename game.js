import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.spaceShip = new SpaceShip(this);
    }
    update(timeDelta) {
        this.spaceShip.update(this.input.pressedKeys);
    }
    draw(context) {
        this.spaceShip.draw(context);
    }
}
