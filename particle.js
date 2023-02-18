import { Coordinates } from "./collisiondetection.js";

class Particle {
    constructor(game) {
        this.game = game;
        this.age = 0;
        this.particleLifetime = 1000;
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

export class Debris extends Particle {
    constructor(game, asteroid) {
        super(game);
        this.size = 1;
        this.coordinate = new Coordinates(asteroid.coordinate.x, asteroid.coordinate.y);
        const baseSpeed = 0.8;
        const speedModifier = Math.random() + 0.5; // random number between 0.5 and 1.5
        this.xVelocity = Math.cos(Math.random() * Math.PI * 2) * baseSpeed * speedModifier;
        this.yVelocity = Math.sin(Math.random() * Math.PI * 2) * baseSpeed * speedModifier;
    }
}