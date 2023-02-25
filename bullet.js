import { Coordinates, pointCircleCollision } from './collisiondetection.js';
import { wrapPosition } from './helperFunctions.js';

export default class Bullet {
    constructor(game) {
        this.game = game;
        this.spaceShip = game.spaceShip;
        this.size = 2;
        this.coordinate = new Coordinates(
            this.spaceShip.coordinate.x
            + (Math.cos(this.spaceShip.direction)
            * (this.spaceShip.height / 2)),
            this.spaceShip.coordinate.y
            + (Math.sin(this.spaceShip.direction)
            * (this.spaceShip.height / 2)),
        );
        this.xVelocity = 5 * Math.cos(this.spaceShip.direction);
        this.yVelocity = 5 * Math.sin(this.spaceShip.direction);
        this.age = 0;
        this.bulletLifetime = 2000;
        this.markedForDeletion = false;
    }

    checkCollision() {
        this.game.asteroids.forEach((asteroid) => {
            if (pointCircleCollision(this.coordinate, asteroid.coordinate, asteroid.radius + 2)) {
                asteroid.explode();
                this.markedForDeletion = true;
            }
        });
    }

    update(timeDelta) {
        this.age += timeDelta;
        if (this.age > this.bulletLifetime) this.markedForDeletion = true;
        this.coordinate.x += this.xVelocity;
        this.coordinate.y += this.yVelocity;
        this.coordinate = wrapPosition(
            this.game.screenWidth,
            this.game.screenHeight,
            this.coordinate,
            this.size,
        );
        this.checkCollision();
    }

    draw(context) {
        context.fillRect(this.coordinate.x, this.coordinate.y, this.size, this.size);
    }
}
