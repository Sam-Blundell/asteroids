
export default class Bullet {
    constructor(game) {
        this.game = game;
        this.width = 2;
        this.height = 2;
        // get from spaceship
        this.xPos = null;
        this.yPos = null;
        this.direction = null;
        this.xVelocity = null;
        this.yVelocity = null;
        this.lifeTime = 1;
    }
    update(timeDelta) {

    }
    draw(context) {

    }
}