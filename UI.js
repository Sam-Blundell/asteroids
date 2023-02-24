export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.ship = 'A';
        this.shipOffset = 20;
    }

    draw(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // temp lives display
        for (let i = 0; i < this.game.lives; i += 1) {
            context.fillText('A ', this.shipOffset, 50);
            this.shipOffset += 25;
        }
        this.shipOffset = 20;
        // score
        context.fillText(`${this.game.score}`, this.game.screenWidth / 2, 50);
    }
}
