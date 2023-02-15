
export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.validKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space'];
        this.pressedKeys = [];
        window.addEventListener('keydown', event => {
            if (this.validKeys.includes(event.code) && !this.pressedKeys.includes(event.code)) {
                this.pressedKeys.push(event.code);
            }
        });
        window.addEventListener('keyup', event => {
            if (this.pressedKeys.includes(event.code)) {
                this.pressedKeys.splice(this.pressedKeys.indexOf(event.code), 1);
            }
        })
    }
}
