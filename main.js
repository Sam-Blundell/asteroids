// TODO:
//  Make sure asteroids can't spawn on top of the ship.
//  Use a static asset for asteroids rather than drawing them.
//  Add engine animation when ship is accellerating.
//  Add particle effect when ship explodes.
//  look into web audio api instead of audio tag.
//  Ship should be able to enter hyperspace
//  Pre-draw ship and asteroids and then use asset instead of drawing every time
//  saucers

import Game from './game.js';

window.addEventListener('load', () => {
    const gameScreen = document.getElementById('gameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 800;
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
    };
    animate(0);
});

// Thoughts:
// I'm doing a lot of polling booleans or checking if values are contained
// in arrays on every update. Feels stupid. Maybe event emitters and consumers
// would be an alternative?
//
// Look into "squared euclidean distance" calculation as a possible alternative
// to the normal pythagoras method of finding distances between points. It
// might be more computationally efficient.
//
// Do some reading on the jordan curve theorem
