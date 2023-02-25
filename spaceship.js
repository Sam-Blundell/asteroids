import Bullet from './bullet.js';
import { circleRectangleCollision, Coordinates } from './collisiondetection.js';
import { ShipSounds } from './soundmanager.js';
import { wrapPosition, notInMiddle } from './helperFunctions.js';
import { Wreckage } from './particle.js';

const vertical = (3 / 2) * Math.PI;

export default class SpaceShip {
    constructor(game) {
        this.game = game;
        this.width = 18;
        this.height = 26;
        this.coordinate = new Coordinates(game.screenWidth / 2, game.screenHeight / 2);
        this.shape = SpaceShip.DrawShip(this.width, this.height);
        this.direction = vertical;
        this.turnSpeed = 2 * (Math.PI / 120);
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.thrustPower = 0.1;
        this.maxSpeed = 10;
        this.drag = 1.01;
        this.firing = false;
        this.engine = false;
        this.shipSounds = new ShipSounds();
        this.waitingToRespawn = false;
        this.respawnInterval = 0;
    }

    static DrawShip(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'white';

        context.beginPath();
        context.moveTo(width / 2, 1);
        context.lineTo(width - 1, height - 1);
        context.lineTo(1, height - 1);
        context.lineTo(width / 2, 1);
        context.stroke();

        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    shoot() {
        if (!this.firing) {
            this.game.playerBullets.push(new Bullet(this.game)); // new
            this.shipSounds.play('laser');
            this.firing = true;
        }
    }

    explode() {
        this.shipSounds.play('bigExplosion');
        this.game.wreckage = Array.from({ length: 6 }, () => new Wreckage(this.game, this));
        this.waitingToRespawn = true;
    }

    respawn() {
        this.coordinate.x = this.game.screenWidth / 2;
        this.coordinate.y = this.game.screenHeight / 2;
        this.direction = vertical;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.waitingToRespawn = false;
    }

    checkCollision() {
        this.game.asteroids.forEach((asteroid) => {
            const collision = circleRectangleCollision(
                this.coordinate,
                this.height,
                this.width,
                asteroid.coordinate,
                asteroid.radius * 0.6,
            );
            if (collision) {
                this.game.lives -= 1;
                this.explode();
                asteroid.explode();
            }
        });
    }

    update(timeDelta, input) {
        // collision check
        if (!this.waitingToRespawn) {
            this.checkCollision();
        }

        // move the ship in the direction it's facing
        if (input.has('ArrowUp')) {
            this.shipSounds.playThrusters();
            this.engine = true;
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
            this.engine = false;
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
        if (input.has('Space') && !this.waitingToRespawn) {
            this.shoot();
        } else {
            this.firing = false;
        }

        // respawn dead ship if player has lives left.
        if (this.waitingToRespawn && this.game.lives > 0) {
            // Wait a few seconds and respawn if the centre of the screen is clear of asteroids.
            if ((this.respawnInterval > 3000) && this.game.asteroids.every(notInMiddle)) {
                this.respawn();
                this.respawnInterval = 0;
            }
            this.respawnInterval += timeDelta;
        }
    }

    draw(context) {
        context.save(); // save the current transformation matrix

        // move to the center of the image
        context.translate(this.coordinate.x, this.coordinate.y);

        // rotate the image around its center
        context.rotate(this.direction + Math.PI / 2);

        // draw the image, centered at the origin (0, 0)
        context.drawImage(
            this.shape,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height,
        );
        if (this.engine) {
            context.beginPath();
            context.moveTo(-this.width / 4, this.height / 2);
            context.lineTo(0, this.height / 1.3);
            context.lineTo(this.width / 4, this.height / 2);
            context.stroke();
        }

        context.restore(); // restore the previous transformation matrix
    }
}
