import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';
import { BigAsteroid } from './asteroid.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.spaceShip = new SpaceShip(this);
        this.testAsteroid = new BigAsteroid(this);
    }
    update(timeDelta) {
        this.spaceShip.update(timeDelta, this.input.pressedKeys);
        this.testAsteroid.update(timeDelta);
    }
    draw(context) {
        this.spaceShip.draw(context);
        this.testAsteroid.draw(context);
    }
}
