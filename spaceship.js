

export default class SpaceShip {
    constructor(game) {
        this.game = game;
        this.width = 10;
        this.height = 20;
        this.xPos = (this.gameWidth / 2) - (this.width / 2);
        this.yPos = (this.gameHeight / 2) - (this.height / 2);
    }
    draw(context) {
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
