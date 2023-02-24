import Bullet from './bullet.js';
import { circleRectangleCollision, Coordinates } from './collisiondetection.js';
import { ShipSounds } from './soundmanager.js';
import wrapPosition from './helperFunctions.js';

const vertical = (3 / 2) * Math.PI;

export default class SpaceShip {
    constructor(game) {
        this.game = game;
        this.width = 18;
        this.height = 26;
        this.coordinate = new Coordinates(game.screenWidth / 2, game.screenHeight / 2);
        this.direction = vertical;
        this.turnSpeed = 2 * (Math.PI / 120);
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.thrustPower = 0.1;
        this.maxSpeed = 10;
        this.drag = 1.01;
        this.bullets = [];
        this.firing = false;
        this.shipSounds = new ShipSounds();
    }

    explode() {
        this.coordinate.x = this.game.screenWidth / 2;
        this.coordinate.y = this.game.screenHeight / 2;
        this.direction = vertical;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.shipSounds.play('bigExplosion');
    }

    shoot() {
        if (!this.firing) {
            this.bullets.push(new Bullet(this));
            this.shipSounds.play('laser');
            this.firing = true;
        }
    }

    getShipVertices() {
        // get starting upright vertices
        const currentX = this.coordinate.x;
        const currentY = this.coordinate.y;
        let front = new Coordinates(
            currentX,
            currentY - (this.height / 2),
        );
        let left = new Coordinates(
            currentX - (this.height / 2),
            currentY + (this.width / 2),
        );
        let right = new Coordinates(
            currentX + (this.height / 2),
            currentY + (this.width / 2),
        );

        // translate to the origin, rotate to the direction, translate back into place.
        front = front.subtract(this.coordinate).rotate(this.direction).add(this.coordinate);
        left = left.subtract(this.coordinate).rotate(this.direction).add(this.coordinate);
        right = right.subtract(this.coordinate).rotate(this.direction).add(this.coordinate);

        return [front, left, right];
    }

    checkCollision() {
        this.game.asteroids.forEach((asteroid) => {
            const collision = circleRectangleCollision(
                this.coordinate,
                this.height,
                this.width,
                asteroid.coordinate,
                asteroid.radius,
            );
            if (collision) {
                this.explode();
            }
        });
    }

    update(timeDelta, input) {
        // move the ship in the direction it's facing
        if (input.has('ArrowUp')) {
            this.shipSounds.playThrusters();
            this.xVelocity += this.thrustPower * Math.cos(this.direction);
            this.yVelocity += this.thrustPower * Math.sin(this.direction);
            // limit speed
            const speed = Math.sqrt(this.xVelocity ** 2 + this.yVelocity ** 2);
            if (speed > this.maxSpeed) {
                const scaleFactor = this.maxSpeed / speed;
                this.xVelocity *= scaleFactor;
                this.yVelocity *= scaleFactor;
            }
        } else {
            this.shipSounds.stopThrusters();
            this.xVelocity = Math.abs(this.xVelocity) < 0.1 ? 0 : this.xVelocity / this.drag;
            this.yVelocity = Math.abs(this.yVelocity) < 0.1 ? 0 : this.yVelocity / this.drag;
        }
        this.coordinate.x += this.xVelocity;
        this.coordinate.y += this.yVelocity;
        // wrap around when moving beyond the edge of the screen.
        this.coordinate = wrapPosition(
            this.game.screenWidth,
            this.game.screenHeight,
            this.coordinate,
            this.width,
            this.height,
        );

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

        this.bullets = this.bullets.filter((bullet) => bullet.markedForDeletion === false);
        this.bullets.forEach((bullet) => bullet.update(timeDelta));
        this.checkCollision();
    }

    draw(context) {
        context.save(); // save the current transformation matrix

        // move to the center of the triangle
        context.translate(this.coordinate.x, this.coordinate.y);
        context.rotate(this.direction); // rotate the triangle
        context.beginPath();
        context.moveTo(this.height / 2, 0);
        context.lineTo(-(this.height / 2), this.width / 2);
        context.lineTo(-(this.height / 2), -(this.width / 2));
        context.lineTo(this.height / 2, 0);
        context.stroke();

        context.restore(); // restore the previous transformation matrix

        this.bullets.forEach((bullet) => bullet.draw(context));
    }
}
