import { Coordinates } from "./collisiondetection.js";
class Asteroid {
    constructor(asteroid) {
        // game, xPos, and yPos will be undefined if the asteroid is created
        // by the spawnAsteroids method from the game class.
        this.game = asteroid.game || asteroid;
        this.coordinates = new Coordinates(
            asteroid.coordinates?.x || Math.floor(Math.random() * this.game.screenWidth),
            asteroid.coordinates?.y || Math.floor(Math.random() * this.game.screenHeight),
        );
        this.direction = Math.random() * 2 * Math.PI;
        this.xVelocity = Math.cos(this.direction);
        this.yVelocity = Math.sin(this.direction);
        this.markedForDeletion = false;
    }
    explode() {
        this.markedForDeletion = true;
        this.game.asteroidSounds.play(this.explosionType);
    }
    update() {
        this.coordinates.x += this.xVelocity * this.speed;
        this.coordinates.y += this.yVelocity * this.speed;

        if (this.coordinates.x < -this.radius / 2) {
            this.coordinates.x = this.game.screenWidth + this.radius / 2;
        } else if (this.coordinates.x > this.game.screenWidth + this.radius / 2) {
            this.coordinates.x = -this.radius / 2;
        }

        // Wrap around the y-axis
        if (this.coordinates.y < -this.radius / 2) {
            this.coordinates.y = this.game.screenHeight + this.radius / 2;
        } else if (this.coordinates.y > this.game.screenHeight + this.radius / 2) {
            this.coordinates.y = -this.radius / 2;
        }
    }
    draw(context) {
        context.beginPath();
        context.arc(this.coordinates.x, this.coordinates.y, this.radius, 0, Math.PI * 2, true);
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
