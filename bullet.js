import { Coordinates, pointCircleCollision } from "./collisiondetection.js";
import { wrapPosition } from "./helperFunctions.js";
export default class Bullet {
    constructor(spaceship) {
        this.game = spaceship.game;
        this.spaceship = spaceship;
        this.size = 4;
        this.coordinate = new Coordinates(
            // no idea why the -2 is needed here. Without it the bullets are just slightly off
            // centre when they emerge from the ship.
            spaceship.coordinate.x + (Math.cos(spaceship.direction) * (spaceship.height / 2) - 2),
            spaceship.coordinate.y + (Math.sin(spaceship.direction) * (spaceship.height / 2) - 2),
        );
        this.xVelocity = 5 * Math.cos(spaceship.direction);
        this.yVelocity = 5 * Math.sin(spaceship.direction);
        this.age = 0;
        this.bulletLifetime = 2000;
        this.markedForDeletion = false;
    }
    checkCollision() {
        this.game.asteroids.forEach(asteroid => {
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
        wrapPosition(this.game.screenWidth, this.game.screenHeight, this.coordinate, this.size)
        this.checkCollision();
    }
    draw(context) {
        context.fillRect(this.coordinate.x, this.coordinate.y, this.size, this.size);
    }
}
