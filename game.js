import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';
import { BigAsteroid } from './asteroid.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.spaceShip = new SpaceShip(this);
        this.asteroids = [
            new BigAsteroid(this),
            new BigAsteroid(this),
            new BigAsteroid(this),
            new BigAsteroid(this),
        ];
    }
    update(timeDelta) {
        this.spaceShip.update(timeDelta, this.input.pressedKeys);
        this.asteroids = this.asteroids.filter(asteroid => asteroid.markedForDeletion === false);
        this.asteroids.forEach(asteroid => asteroid.update());
    }
    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(0, 0, gameScreen.height, gameScreen.width);
        context.fillStyle = 'white';
        this.spaceShip.draw(context);
        this.asteroids.forEach(asteroid => asteroid.draw(context));
    }
}
