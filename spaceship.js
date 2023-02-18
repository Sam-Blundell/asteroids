import Bullet from "./bullet.js";
import { ShipSounds } from "./soundmanager.js";
export default class SpaceShip {
    constructor(game) {
        this.game = game;
        this.width = 25;
        this.height = 40;
        this.xPos = (game.screenWidth / 2);
        this.yPos = (game.screenHeight / 2);
        this.direction = 3/2 * Math.PI;
        this.turnSpeed = 2 * Math.PI / 120;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.forwardSpeed = 2;
        this.bullets = [];
        this.firing = false;
        this.shipSounds = new ShipSounds();
    }
    shoot() {
        if (!this.firing) {
            this.bullets.push(new Bullet(this));
            this.shipSounds.play('laser');
            this.firing = true;
        }
    }
    update(timeDelta, input) {
        // move the ship in the direction it's facing
        if (input.has('ArrowUp')) {
            this.shipSounds.playThrusters();
            this.xVelocity = this.forwardSpeed * Math.cos(this.direction);
            this.yVelocity = this.forwardSpeed * Math.sin(this.direction);
        } else {
            this.shipSounds.stopThrusters();
            this.xVelocity = 0;
            this.yVelocity = 0;
        }
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;

        // Wrap around the x-axis
        if (this.xPos < -this.width / 2) {
            this.xPos = this.game.screenWidth + this.width / 2;
        } else if (this.xPos > this.game.screenWidth + this.width / 2) {
            this.xPos = -this.width / 2;
        }

        // Wrap around the y-axis
        if (this.yPos < -this.height / 2) {
            this.yPos = this.game.screenHeight + this.height / 2;
        } else if (this.yPos > this.game.screenHeight + this.height / 2) {
            this.yPos = -this.height / 2;
        }

        // turning the ship
        if (input.has('ArrowRight')) {
            this.direction = (this.direction + this.turnSpeed) % (2 * Math.PI);
        }
        if (input.has('ArrowLeft')) {
            this.direction = (this.direction - this.turnSpeed + (2 * Math.PI)) % (2 * Math.PI);
        }

        // firing laser
        if (input.has('Space')) {
            this.shoot();
        } else {
            this.firing = false;
        }

        this.laserCooldown = this.laserCooldown < 0 ? 0 : this.laserCooldown - timeDelta;
        this.bullets = this.bullets.filter(bullet => bullet.markedForDeletion === false);
        this.bullets.forEach(bullet => bullet.update(timeDelta));

        }
        draw(context) {
        context.save(); // save the current transformation matrix

        context.translate(this.xPos, this.yPos); // move to the center of the triangle
        context.rotate(this.direction); // rotate the triangle
        context.beginPath();
        context.moveTo(this.height / 2, 0);
        context.lineTo(-(this.height / 2), this.width / 2);
        context.quadraticCurveTo(-5, 0, -(this.height / 2), -(this.width / 2));
        context.lineTo(this.height / 2, 0);
        context.stroke();

        context.restore(); // restore the previous transformation matrix

        this.bullets.forEach(bullet => bullet.draw(context));
    }
}
