class SoundManager {
    constructor() {
        this.sounds = {};
    }

    load(name, path, loop) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        if (loop) audio.loop = true;
        audio.addEventListener('error', (event) => {
            throw new Error(`Error loading audio file ${path}: ${event}`);
        });
        this.sounds[name] = audio;
    }

    play(name) {
        const audio = this.sounds[name];
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
}

export class ShipSounds extends SoundManager {
    constructor() {
        super();
        this.load('laser', './audiosamples/laser.wav');
        this.load('thrusters', './audiosamples/thrusters.wav', true);
        this.load('bigExplosion', 'audiosamples/bigExplosion.wav');
        this.playingThrusters = false;
    }

    playThrusters() {
        if (!this.playingThrusters) {
            this.sounds.thrusters.currentTime = 0;
            this.sounds.thrusters.play();
            this.playingThrusters = true;
        }
    }

    stopThrusters() {
        if (this.playingThrusters) {
            this.sounds.thrusters.pause();
            this.playingThrusters = false;
        }
    }
}

export class AsteroidSounds extends SoundManager {
    constructor() {
        super();
        this.load('bigExplosion', './audiosamples/bigExplosion.wav');
        this.load('mediumExplosion', './audiosamples/mediumExplosion.wav');
        this.load('smallExplosion', './audiosamples/smallExplosion.wav');
    }
}
