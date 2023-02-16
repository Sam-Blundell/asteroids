import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';
import { BigAsteroid } from './asteroid.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.spaceShip = new SpaceShip(this);
        this.asteroids = [];
    }
    spawnAsteroids(asteroidCount) {
        for (let i = 0; i < asteroidCount; i++) {
            this.asteroids.push(new BigAsteroid(this));
        }
    }
    update(timeDelta) {
        this.spaceShip.update(timeDelta, this.input.pressedKeys);
        this.asteroids = this.asteroids.filter(asteroid => asteroid.markedForDeletion === false);
        this.asteroids.forEach(asteroid => asteroid.update());
        if (this.asteroids.length === 0) {
            this.spawnAsteroids(4);
        }
    }
    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(0, 0, gameScreen.height, gameScreen.width);
        context.fillStyle = 'white';
        this.spaceShip.draw(context);
        this.asteroids.forEach(asteroid => asteroid.draw(context));
    }
}
