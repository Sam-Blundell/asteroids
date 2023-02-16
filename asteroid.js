class Asteroid {
    constructor(game) {
        this.game = game;
        this.xPos = 0;
        this.yPos = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    update(timeDelta) {

    }
    draw(context) {
        
    }
}

export class BigAsteroid extends Asteroid {
    constructor() {
        super();
    }
}

export class MediumAsteroid extends Asteroid {
    constructor() {
        super();
    }
}

export class SmallAsteroid extends Asteroid {
    constructor() {
        super();
    }
}
