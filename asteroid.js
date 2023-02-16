class Asteroid {
    constructor(game) {
        this.game = game;
        this.xPos = Math.floor(Math.random() * 600);
        this.yPos = Math.floor(Math.random() * 600);
        this.direction = Math.random() * 2 * Math.PI;
        this.xVelocity = Math.cos(this.direction);
        this.yVelocity = Math.sin(this.direction);
        this.markedForDeletion = false;
    }
    update() {
        this.xPos += this.xVelocity * this.speed;
        this.yPos += this.yVelocity * this.speed;

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
        context.stroke();
    }
}

export class BigAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 60;
        this.speed = 1;
    }
    explode() {
        this.game.asteroids.push(new MediumAsteroid(this.game));
        this.game.asteroids.push(new MediumAsteroid(this.game));
    }
}

export class MediumAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 30;
        this.speed = 1.5;
    }
}

export class SmallAsteroid extends Asteroid {
    constructor(game) {
        super(game);
        this.radius = 10;
        this.speed = 2;
    }
}
