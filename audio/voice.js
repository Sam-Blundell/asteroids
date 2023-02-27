export default class Voice {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.audioContext = soundManager.audioContext;
        this.VCA = this.setupVCA();
        this.VCO = this.setupVCO();
    }

    setupVCA() {
        const VCA = this.audioContext.createGain();
        VCA.connect(this.soundManager.masterVolume);
        return VCA;
    }

    setupVCO() {
        const VCO = this.audioContext.createOscillator();
        VCO.connect(this.VCA);
        VCO.start();
        return VCO;
    }

    waveform(waveform) {
        this.VCO.type = waveform;
    }

    amplitudeEnvelope(attackVal, attackTime, releaseVal, releaseTime) {
        const now = this.audioContext.currentTime;
        this.VCA.gain.linearRampToValueAtTime(attackVal, now + attackTime);
        this.VCA.gain.linearRampToValueAtTime(releaseVal, now + attackTime + releaseTime);
    }

    pitchEnvelope(attackVal, attackTime, releaseVal, releaseTime) {
        const now = this.audioContext.currentTime;
        this.VCO.frequency.linearRampToValueAtTime(attackVal, now + attackTime);
        this.VCO.frequency.linearRampToValueAtTime(releaseVal, now + attackTime + releaseTime);
    }
}
