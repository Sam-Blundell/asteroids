class Asteroid {
    constructor(game) {
        this.game = game;
        this.xPos = 300;
        this.yPos = 300;
        this.xVelocity = 1;
        this.yVelocity = 1;
    }
    update(timeDelta) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;

        // Wrap around the x-axis
        if (this.xPos < -this.radius / 2) {
            this.xPos = this.game.screenWidth + this.radius / 2;
        } else if (this.xPos > this.game.screenWidth + this.radius / 2) {
            this.xPos = -this.radius / 2;
        }

        // Wrap around the y-axis
        if (this.yPos < -this.radius / 2) {
            this.yPos = this.game.screenHeight + this.radius / 2;
        } else if (this.yPos > this.game.screenHeight + this.radius / 2) {
            this.yPos = -this.radius / 2;
        }
    }
    draw(context) {
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
        context.strokeStyle = 'white';
        context.stroke();
    }
}

export class BigAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 50;
    }
}

export class MediumAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 25;
    }
}

export class SmallAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 10;
    }
}
