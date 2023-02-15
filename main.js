import Game from './game.js';

window.addEventListener('load', () => {
    const gameScreen = document.getElementById('gameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 600;
    gameScreen.width = 600;
    const game = new Game(gameScreen.height, gameScreen.width);

    let lastTimeStamp = 0;
    const animate = (timeStamp) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, gameScreen.height, gameScreen.width);
        context.fillStyle = 'white';
        const timeDelta = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(timeDelta);
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate(0);
})
