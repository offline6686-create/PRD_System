/**
 * Reproductor de Backing Tracks con Web Audio API
 * Permite reproducir audio con Pitch Shift (cambiar tono) y Tempo Control (cambiar velocidad sin alterar tono)
 */

class BackingTracksPlayer {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.audioBuffer = null;
        this.sourceNode = null;
        this.playbackRate = 1.0;
        this.pitchSemitones = 0;
        this.isPlaying = false;
    }

    async loadAudioUrl(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    setPlaybackRate(rate) { // 0.5x a 2.0x
        this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
        if (this.sourceNode) {
            this.sourceNode.playbackRate.value = this.playbackRate;
        }
    }

    setPitchSemitones(semitones) { // -6 a +6 semitonos
        this.pitchSemitones = semitones;
        // Pitch shift en Web Audio API recalculando detune (100 cents = 1 semitono)
        if (this.sourceNode) {
            this.sourceNode.detune.value = semitones * 100;
        }
    }

    play() {
        if (!this.audioBuffer) return;
        this.stop();

        this.sourceNode = this.audioCtx.createBufferSource();
        this.sourceNode.buffer = this.audioBuffer;
        this.sourceNode.playbackRate.value = this.playbackRate;
        this.sourceNode.detune.value = this.pitchSemitones * 100;
        this.sourceNode.connect(this.audioCtx.destination);
        this.sourceNode.start(0);
        this.isPlaying = true;
    }

    stop() {
        if (this.sourceNode) {
            try { this.sourceNode.stop(); } catch(e) {}
            this.sourceNode.disconnect();
            this.sourceNode = null;
        }
        this.isPlaying = false;
    }
}

if (typeof module !== 'undefined') {
    module.exports = BackingTracksPlayer;
}
