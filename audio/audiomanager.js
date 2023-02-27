import Voice from './voice.js';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class AudioManager {
    constructor(game) {
        this.game = game;
        this.audioContext = new AudioContext();
        this.maxVolume = 0.5;
        this.masterVolume = new GainNode(this.audioContext, { gain: this.maxVolume });
        this.masterVolume.connect(this.audioContext.destination);
    }

    beep() {
        const beep = new Voice(this);
        beep.waveform('sawtooth');
        beep.amplitudeEnvelope(0.5, 0, 0, 0.25);
        beep.pitchEnvelope(880, 0, 0, 0.25);
    }
}
