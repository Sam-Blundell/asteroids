
// TODO:
//  Improve ship handling with gradual accelleration and drift.
//  Add collision detection between ship and asteroids.
//  Make sure asteroids can't spawn on top of the ship.
//  Add particle effect when asteroids explode.
//  Use a static asset for asteroids rather than drawing them.
//  Add engine animation when ship is accellerating.
//  Add explode method for ship.
//  Add particle effect when ship explodes.
//  Add lives system.
//  Add UI.
//  Add score system.


import Game from './game.js';

window.addEventListener('load', () => {
    const gameScreen = document.getElementById('gameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 700;
    gameScreen.width = 1000;
    context.strokeStyle = 'white';
    context.lineWidth = 1;
    const game = new Game(gameScreen.height, gameScreen.width);

    let lastTimeStamp = 0;
    const animate = (timeStamp) => {
        const timeDelta = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(timeDelta);
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate(0);
})
