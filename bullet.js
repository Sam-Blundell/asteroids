import { Coordinates, pointCircleCollision } from "./collisiondetection.js";
export default class Bullet {
    constructor(spaceship) {
        this.game = spaceship.game;
        this.spaceship = spaceship;
        this.size = 4;
        this.coordinates = new Coordinates(
            spaceship.xPos + (Math.cos(spaceship.direction) * (spaceship.height / 2)) + 2,
            spaceship.yPos + (Math.sin(spaceship.direction) * (spaceship.height / 2)) + 2,
        );
        this.xVelocity = 5 * Math.cos(spaceship.direction);
        this.yVelocity = 5 * Math.sin(spaceship.direction);
        this.age = 0;
        this.markedForDeletion = false;
        this.bulletLifetime = 2000;
    }
    checkCollision() {
        this.game.asteroids.forEach(asteroid => {
            if (pointCircleCollision(this.coordinates, asteroid.coordinates, asteroid.radius + 2)) {
                asteroid.explode();
                this.markedForDeletion = true;
            }
        });
    }
    update(timeDelta) {
        this.age += timeDelta;
        if (this.age > this.bulletLifetime) this.markedForDeletion = true;
        this.coordinates.x += this.xVelocity;
        this.coordinates.y += this.yVelocity;

        // Wrap around the x-axis
        if (this.coordinates.x < -this.size / 2) {
            this.coordinates.x = this.game.screenWidth + this.size / 2;
        } else if (this.coordinates.x > this.game.screenWidth + this.size / 2) {
            this.coordinates.x = -this.size / 2;
        }

        // Wrap around the y-axis
        if (this.coordinates.y < -this.size / 2) {
            this.coordinates.y = this.game.screenHeight + this.size / 2;
        } else if (this.coordinates.y > this.game.screenHeight + this.size / 2) {
            this.coordinates.y = -this.size / 2;
        }
        this.checkCollision();
    }
    draw(context) {
        context.fillRect(this.coordinates.x, this.coordinates.y, this.size, this.size);
    }
}
