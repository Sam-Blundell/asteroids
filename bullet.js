import { pointCircleCollision } from "./collisiondetection.js";
export default class Bullet {
    constructor(spaceship) {
        this.game = spaceship.game;
        this.spaceship = spaceship;
        this.size = 4;
        this.xPos = spaceship.xPos + (Math.cos(spaceship.direction) * (spaceship.height / 2));
        this.yPos = spaceship.yPos + (Math.sin(spaceship.direction) * (spaceship.height / 2));
        this.xVelocity = 5 * Math.cos(spaceship.direction);
        this.yVelocity = 5 * Math.sin(spaceship.direction);
        this.age = 0;
        this.markedForDeletion = false;
        this.bulletLifetime = 2000;
    }
    checkCollision() {
        this.game.asteroids.forEach(asteroid => {
            if (pointCircleCollision(this.xPos + 2, this.yPos + 2, asteroid.xPos, asteroid.yPos, asteroid.radius + 2)) {
                asteroid.explode();
                this.markedForDeletion = true;
            }
        });
    }
    update(timeDelta) {
        this.age += timeDelta;
        if (this.age > this.bulletLifetime) this.markedForDeletion = true;
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;

        // Wrap around the x-axis
        if (this.xPos < -this.size / 2) {
            this.xPos = this.game.screenWidth + this.size / 2;
        } else if (this.xPos > this.game.screenWidth + this.size / 2) {
            this.xPos = -this.size / 2;
        }

        // Wrap around the y-axis
        if (this.yPos < -this.size / 2) {
            this.yPos = this.game.screenHeight + this.size / 2;
        } else if (this.yPos > this.game.screenHeight + this.size / 2) {
            this.yPos = -this.size / 2;
        }
        this.checkCollision();
    }
    draw(context) {
        context.fillRect(this.xPos, this.yPos, this.size, this.size);
    }
}
