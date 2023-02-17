class SoundManager {
    constructor() {
        this.sounds = {};
    }
    load(name, path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        audio.addEventListener('error', (event) => {
            console.error(`Error loading audio file ${path}: ${event}`);
        })
        this.sounds[name] = audio;
    }
    play(name) {
        let audio = this.sounds[name];
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
}

export class ShipSounds extends SoundManager {
    constructor() {
        super();
        this.load('laser', './audiosamples/laser.wav')
    }
}