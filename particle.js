import { Coordinates } from './collisiondetection.js';

class Particle {
    constructor(game) {
        this.game = game;
        this.age = 0;
        this.particleLifetime = (Math.random() * 1000) + 500;
        this.markedForDeletion = false;
    }

    update(timeDelta) {
        this.age += timeDelta;
        if (this.age > this.particleLifetime) this.markedForDeletion = true;
        this.coordinate.x += this.xVelocity;
        this.coordinate.y += this.yVelocity;
    }

    draw(context) {
        context.fillRect(this.coordinate.x, this.coordinate.y, this.size, this.size);
    }
}

class Debris extends Particle {
    constructor(game, asteroid) {
        super(game);
        this.size = 1;
        this.coordinate = new Coordinates(asteroid.coordinate.x, asteroid.coordinate.y);
        this.baseSpeed = 0.8;
        this.speedMod = Math.random() + 0.5; // random number between 0.5 and 1.5
        this.xVelocity = Math.cos(Math.random() * Math.PI * 2) * this.baseSpeed * this.speedMod;
        this.yVelocity = Math.sin(Math.random() * Math.PI * 2) * this.baseSpeed * this.speedMod;
    }
}

class Wreckage extends Particle {
    constructor(game, ship) {
        super(game);
        this.coordinate = new Coordinates(ship.coordinate.x, ship.coordinate.y);
        this.baseSpeed = 0.5;
        this.speedMod = Math.random() + 0.5; // random number between 0.5 and 1.5
        this.lineLength = 20;
        this.offSet = Math.random() * Math.PI * 2;
        this.angle = Math.random() * Math.PI * 2;
        this.xVelocity = Math.cos(this.angle) * this.baseSpeed * this.speedMod;
        this.yVelocity = Math.sin(this.angle) * this.baseSpeed * this.speedMod;
        this.particleLifetime = (Math.random() * 1000) + 1000;
    }

    draw(context) {
        context.beginPath();

        context.moveTo(
            this.coordinate.x + (Math.cos(this.offSet) * (this.game.spaceShip.height / 2)),
            this.coordinate.y + (Math.sin(this.offSet) * (this.game.spaceShip.height / 2)),
        );

        context.lineTo(
            this.coordinate.x + (Math.cos(this.angle) * (this.game.spaceShip.height / 2)),
            this.coordinate.y + (Math.sin(this.angle) * (this.game.spaceShip.height / 2)),
        );
        context.stroke();
    }
}

export { Debris, Wreckage };
