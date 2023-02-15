export default class Bullet {
    constructor(spaceship) {
        this.game = spaceship.game;
        this.spaceship = spaceship;
        this.size = 4;
        // get from spaceship
        this.xPos = spaceship.xPos;
        this.yPos = spaceship.yPos;
        this.xVelocity = 5 * Math.cos(spaceship.direction);
        this.yVelocity = 5 * Math.sin(spaceship.direction);
        this.age = 0;
        this.markedForDeletion = false;
    }
    update(timeDelta) {
        this.age += timeDelta;
        if (this.age > 1500) this.markedForDeletion = true;
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
    }
    draw(context) {
        context.fillRect(this.xPos, this.yPos, this.size, this.size);
    }
}
