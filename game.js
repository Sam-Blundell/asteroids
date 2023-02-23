import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';
import { BigAsteroid } from './asteroid.js';
import { AsteroidSounds } from './soundmanager.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.spaceShip = new SpaceShip(this);
        this.asteroids = [];
        this.asteroidSounds = new AsteroidSounds();
        this.debris = [];
    }

    spawnAsteroids(asteroidCount) {
        this.asteroids = Array.from({ length: asteroidCount }, () => new BigAsteroid(this));
    }

    update(timeDelta) {
        this.spaceShip.update(timeDelta, this.input.pressedKeys);
        this.asteroids = this.asteroids.filter((asteroid) => asteroid.markedForDeletion === false);
        this.asteroids.forEach((asteroid) => asteroid.update());
        if (this.asteroids.length === 0) {
            this.spawnAsteroids(4);
        }
        this.debris = this.debris.filter((debris) => debris.markedForDeletion === false);
        this.debris.forEach((debris) => debris.update(timeDelta));
    }

    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.screenWidth, this.screenHeight);
        context.fillStyle = 'white';
        this.spaceShip.draw(context);
        this.asteroids.forEach((asteroid) => asteroid.draw(context));
        this.debris.forEach((debris) => debris.draw(context));
    }
}
