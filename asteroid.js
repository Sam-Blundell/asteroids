import { Coordinates } from './collisiondetection.js';
import wrapPosition from './helperFunctions.js';
import Debris from './particle.js';

class Asteroid {
    constructor(asteroid) {
        // game, xPos, and yPos will be undefined if the asteroid is created
        // by the spawnAsteroids method from the game class.
        this.game = asteroid.game || asteroid;
        this.coordinate = new Coordinates(
            asteroid.coordinate?.x || Asteroid.newAsteroidPosition(),
            asteroid.coordinate?.y || Math.floor(Math.random() * this.game.screenHeight),
        );
        this.direction = Math.random() * 2 * Math.PI;
        this.xVelocity = Math.cos(this.direction);
        this.yVelocity = Math.sin(this.direction);
        this.markedForDeletion = false;
    }

    static newAsteroidPosition() {
        const rand = Math.random();
        return Math.floor(rand < 0.5 ? (rand * 400) + 100 : (rand * 400) + 700);
    }

    explode() {
        this.game.score += this.pointValue;
        this.markedForDeletion = true;
        this.game.asteroidSounds.play(this.explosionType);
        this.game.debris = Array.from({ length: this.radius }, () => new Debris(this.game, this));
    }

    update() {
        this.coordinate.x += this.xVelocity * this.speed;
        this.coordinate.y += this.yVelocity * this.speed;
        this.coordinate = wrapPosition(
            this.game.screenWidth,
            this.game.screenHeight,
            this.coordinate,
            this.radius,
        );
    }

    draw(context) {
        context.beginPath();
        context.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2, true);
        context.stroke();
    }
}

export class SmallAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 15;
        this.pointValue = 100;
        this.speed = Math.random() * 2.5 + 1.5;
        this.explosionType = 'smallExplosion';
    }
}

export class MediumAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 30;
        this.pointValue = 50;
        this.speed = Math.random() * 1.5 + 1;
        this.explosionType = 'mediumExplosion';
    }

    explode() {
        super.explode();
        this.game.asteroids.push(new SmallAsteroid(this));
        this.game.asteroids.push(new SmallAsteroid(this));
    }
}

export class BigAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 60;
        this.pointValue = 20;
        this.speed = Math.random() * 1 + 0.5;
        this.explosionType = 'bigExplosion';
    }

    explode() {
        super.explode();
        this.game.asteroids.push(new MediumAsteroid(this));
        this.game.asteroids.push(new MediumAsteroid(this));
    }
}
