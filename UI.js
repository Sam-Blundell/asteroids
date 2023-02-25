import SpaceShip from './spaceship.js';

export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Courier New';
        this.ship = SpaceShip.DrawShip(15, 22);
        this.shipOffset = 20;
    }

    draw(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        // context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // temp lives display
        for (let i = 0; i < this.game.lives; i += 1) {
            context.drawImage(this.ship, this.shipOffset, 50);
            this.shipOffset += 20;
        }
        this.shipOffset = 20;
        // score
        context.fillText(`${this.game.score}`, 20, 40);
        if (this.game.lives < 1) {
            context.font = `60px ${this.fontFamily}`;
            context.fillText('GAME OVER', 310, this.game.screenHeight / 2);
        }
    }
}
