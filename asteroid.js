import { Coordinates } from './collisiondetection.js';
import { wrapPosition } from './helperFunctions.js';
import { Debris } from './particle.js';

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

    static NewAsteroidShape(radius) {
        const canvas = document.createElement('canvas');
        canvas.width = radius * 2;
        canvas.height = radius * 2;
        const context = canvas.getContext('2d');
        context.strokeStyle = '#FFFFFF';

        context.beginPath();
        const points = 8;
        const angle = (Math.PI * 2) / points;
        for (let i = 0; i < points; i += 1) {
            const surfaceDepth = (radius / 2) + (Math.random() * (radius / 2));
            const xPos = surfaceDepth * Math.cos(i * angle);
            const yPos = surfaceDepth * Math.sin(i * angle);
            if (i === 0) {
                context.moveTo(xPos + radius, yPos + radius);
            } else {
                context.lineTo(xPos + radius, yPos + radius);
            }
        }
        context.closePath();
        context.stroke();

        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    static newAsteroidPosition() {
        const rand = Math.random();
        return Math.floor(rand < 0.5 ? (rand * 400) + 100 : (rand * 400) + 700);
    }

    explode() {
        this.game.updateScore(this.pointValue);
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
        context.drawImage(
            this.shape,
            this.coordinate.x - this.radius,
            this.coordinate.y - this.radius,
        );
    }
}

export class SmallAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 15;
        this.shape = Asteroid.NewAsteroidShape(this.radius);
        this.pointValue = 100;
        this.speed = Math.random() * 2.5 + 1.5;
        this.explosionType = 'smallExplosion';
    }
}

export class MediumAsteroid extends Asteroid {
    constructor(asteroid) {
        super(asteroid);
        this.radius = 30;
        this.shape = Asteroid.NewAsteroidShape(this.radius);
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
        this.shape = Asteroid.NewAsteroidShape(this.radius);
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
