
export default class SpaceShip {
    constructor(game) {
        this.game = game;
        this.width = 10;
        this.height = 30;
        this.xPos = (game.screenWidth / 2) - (this.width / 2);
        this.yPos = (game.screenHeight / 2) - (this.height / 2);
        this.direction = 3/2 * Math.PI;
        this.turnSpeed = 2 * Math.PI / 120;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.forwardSpeed = 2;
    }
    update(input) {
        if (input.includes('ArrowUp')) {
            this.xVelocity = this.forwardSpeed * Math.cos(this.direction);
            this.yVelocity = this.forwardSpeed * Math.sin(this.direction);
        } else {
            this.xVelocity = 0;
            this.yVelocity = 0;
        }
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;
        if (input.includes('ArrowRight')) {
            this.direction = (this.direction + this.turnSpeed) % (2 * Math.PI);
        }
        if (input.includes('ArrowLeft')) {
            this.direction = (this.direction - this.turnSpeed + (2 * Math.PI)) % (2 * Math.PI);
        }
    }
    draw(context) {
        context.save(); // save the current transformation matrix

        context.translate(this.xPos, this.yPos); // move to the center of the triangle
        context.rotate(this.direction); // rotate the triangle
        context.beginPath();
        context.moveTo(this.height / 2, 0);
        context.lineTo(-(this.height / 2), this.width);
        context.lineTo(-(this.height / 2), -(this.width));
        context.lineTo(this.height / 2, 0);
        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.stroke();

        context.restore(); // restore the previous transformation matrix
    }
}
