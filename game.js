import SpaceShip from './spaceship.js';

export default class {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.spaceShip = new SpaceShip(this);
    }
    draw(context) {
        this.spaceShip.draw(context);
    }
}