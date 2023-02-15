
export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.validKeys = Object.freeze(new Set([
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown',
            'ArrowUp',
            'Space'
        ]));
        this.pressedKeys = new Set();
        window.addEventListener('keydown', event => {
            if (this.validKeys.has(event.code)) {
                this.pressedKeys.add(event.code);
            }
        });
        window.addEventListener('keyup', event => {
            if (this.pressedKeys.has(event.code)) {
                this.pressedKeys.delete(event.code);
            }
        })
    }
}
