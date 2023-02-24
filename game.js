import InputHandler from './inputHandler.js';
import SpaceShip from './spaceship.js';
import { BigAsteroid } from './asteroid.js';
import { AsteroidSounds } from './soundmanager.js';
import UI from './UI.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.input = new InputHandler(this);
        this.UI = new UI(this);
        this.spaceShip = new SpaceShip(this);
        this.asteroids = [];
        this.asteroidSounds = new AsteroidSounds();
        this.debris = [];
        this.score = 0;
        this.lives = 3;
        this.extraLives = 0;
        this.round = 0;
    }

    spawnAsteroids() {
        const asteroidCount = this.round > 4 ? 11 : (this.round * 2) + 2;
        this.asteroids = Array.from({ length: asteroidCount }, () => new BigAsteroid(this));
    }

    updateScore(points) {
        this.score += points;
        if (this.score >= (this.extraLives + 1) * 10000) {
            this.lives += 1;
            this.extraLives += 1;
        }
    }

    update(timeDelta) {
        this.spaceShip.update(timeDelta, this.input.pressedKeys);
        this.asteroids = this.asteroids.filter((asteroid) => asteroid.markedForDeletion === false);
        this.asteroids.forEach((asteroid) => asteroid.update());
        if (this.asteroids.length === 0) {
            this.round += 1;
            this.spawnAsteroids();
        }
        this.debris = this.debris.filter((debris) => debris.markedForDeletion === false);
        this.debris.forEach((debris) => debris.update(timeDelta));
    }

    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.screenWidth, this.screenHeight);
        context.fillStyle = 'white';
        if (this.lives > 0 && !this.spaceShip.waitingToRespawn) {
            this.spaceShip.draw(context);
        }
        this.asteroids.forEach((asteroid) => asteroid.draw(context));
        this.debris.forEach((debris) => debris.draw(context));
        this.UI.draw(context);
    }
}
