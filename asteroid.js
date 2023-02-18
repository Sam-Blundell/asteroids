import { Coordinates } from "./collisiondetection.js";
import { wrapPosition } from "./helperFunctions.js";
import { Debris } from "./particle.js";
class Asteroid {
    constructor(asteroid) {
        // game, xPos, and yPos will be undefined if the asteroid is created
        // by the spawnAsteroids method from the game class.
        this.game = asteroid.game || asteroid;
        this.coordinate = new Coordinates(
            asteroid.coordinate?.x || Math.floor(Math.random() * this.game.screenWidth),
            asteroid.coordinate?.y || Math.floor(Math.random() * this.game.screenHeight),
        );
        this.direction = Math.random() * 2 * Math.PI;
        this.xVelocity = Math.cos(this.direction);
        this.yVelocity = Math.sin(this.direction);
        this.markedForDeletion = false;
    }
    explode() {
        this.markedForDeletion = true;
        this.game.asteroidSounds.play(this.explosionType);
        for (let i = 0; i < this.radius; i++) {
            this.game.debris.push(new Debris(this.game, this));
        }
    }
    update() {
        this.coordinate.x += this.xVelocity * this.speed;
        this.coordinate.y += this.yVelocity * this.speed;
        wrapPosition(this.game.screenWidth, this.game.screenHeight, this.coordinate, this.radius);
    }
    draw(context) {
        context.beginPath();
        context.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2, true);
        context.stroke();
    }
}

export class BigAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 60;
        this.speed = 1;
        this.explosionType = 'bigExplosion';
    }
    explode() {
        super.explode();
        this.game.asteroids.push(new MediumAsteroid(this));
        this.game.asteroids.push(new MediumAsteroid(this));
    }
}

export class MediumAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 30;
        this.speed = 1.5;
        this.explosionType = 'mediumExplosion';
    }
    explode() {
        super.explode();
        this.game.asteroids.push(new SmallAsteroid(this));
        this.game.asteroids.push(new SmallAsteroid(this));
    }
}

export class SmallAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 15 ;
        this.speed = 2;
        this.explosionType = 'smallExplosion';
    }
}
