// TODO:
//  Make sure asteroids can't spawn on top of the ship.
//  Transition the rest of the sounds to the webaudio api
//  look into buffering for sound effects.
//  Ship should be able to enter hyperspace
//  saucers
//  Start screen
//  Get better font
//  game over screen improvements
//  high-score screen
//  keep high scores saved, serverless?

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
// event emitters and consumers would be an alternative to filtering arrays?
//
// Look into "squared euclidean distance" calculation as a possible alternative
// to the pythagoras for finding distances.
//
// jordan curve theorem
