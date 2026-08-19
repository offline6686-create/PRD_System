/**
 * Detector de Acordes de Piano en Tiempo Real Vía Web MIDI API ("Chordy Engine")
 * Escucha notas presionadas en teclados/pianos USB/MIDI y reconoce instantaneamente
 * triadas, septimas, novenas, suspendidos e inversiones.
 */

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Catalogo de formulas armónicas por semitonos desde la tónica
const CHORD_FORMULAS = [
    { name: "Major", intervals: [0, 4, 7], suffix: "" },
    { name: "Minor", intervals: [0, 3, 7], suffix: "m" },
    { name: "Diminished", intervals: [0, 3, 6], suffix: "dim" },
    { name: "Augmented", intervals: [0, 4, 8], suffix: "aug" },
    { name: "Major 7th", intervals: [0, 4, 7, 11], suffix: "maj7" },
    { name: "Minor 7th", intervals: [0, 3, 7, 10], suffix: "m7" },
    { name: "Dominant 7th", intervals: [0, 4, 7, 10], suffix: "7" },
    { name: "Half-Diminished 7th", intervals: [0, 3, 6, 10], suffix: "m7b5" },
    { name: "Diminished 7th", intervals: [0, 3, 6, 9], suffix: "dim7" },
    { name: "Suspended 4", intervals: [0, 5, 7], suffix: "sus4" },
    { name: "Suspended 2", intervals: [0, 2, 7], suffix: "sus2" },
    { name: "Add 9", intervals: [0, 4, 7, 14], suffix: "add9" }
];

class MidiChordDetector {
    constructor(onChordDetectedCallback) {
        this.activeMidiNotes = new Set();
        this.onChordDetected = onChordDetectedCallback;
        this.initWebMidi();
    }

    initWebMidi() {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(
                (midiAccess) => this.setupMidiInputs(midiAccess),
                (err) => console.warn("No se pudo acceder a dispositivos MIDI:", err)
            );
        } else {
            console.warn("Web MIDI API no soportada en este navegador.");
        }
    }

    setupMidiInputs(midiAccess) {
        const inputs = midiAccess.inputs.values();
        for (let input of inputs) {
            input.onmidimessage = (message) => this.handleMidiMessage(message);
        }
    }

    handleMidiMessage(message) {
        const [command, noteNumber, velocity] = message.data;
        const channelCommand = command >> 4;

        if (channelCommand === 9 && velocity > 0) { // NoteOn
            this.activeMidiNotes.add(noteNumber);
        } else if (channelCommand === 8 || (channelCommand === 9 && velocity === 0)) { // NoteOff
            this.activeMidiNotes.delete(noteNumber);
        }

        const chordResult = this.identifyChord(Array.from(this.activeMidiNotes));
        if (this.onChordDetected) {
            this.onChordDetected(chordResult, Array.from(this.activeMidiNotes));
        }
    }

    identifyChord(midiNotes) {
        if (midiNotes.length === 0) return { chordName: "Ninguno", root: "-", formula: "-" };

        // Ordenar notas de menor a mayor frecuencia
        const sortedNotes = [...midiNotes].sort((a, b) => a - b);
        const pitchClasses = Array.from(new Set(sortedNotes.map(n => n % 12))).sort((a, b) => a - b);

        if (pitchClasses.length < 2) {
            const rootNote = NOTE_NAMES[pitchClasses[0]];
            return { chordName: rootNote, root: rootNote, formula: "Nota Individual" };
        }

        // Probar cada nota presionada como posible tónica
        for (let rootPC of pitchClasses) {
            const rootName = NOTE_NAMES[rootPC];
            const relativeIntervals = pitchClasses.map(pc => (pc - rootPC + 12) % 12).sort((a, b) => a - b);

            for (let formula of CHORD_FORMULAS) {
                if (formula.intervals.length === relativeIntervals.length &&
                    formula.intervals.every((val, idx) => val === relativeIntervals[idx])) {
                    
                    const bassPC = sortedNotes[0] % 12;
                    const bassName = NOTE_NAMES[bassPC];
                    const isSlashChord = bassPC !== rootPC;
                    const chordSymbol = `${rootName}${formula.suffix}${isSlashChord ? '/' + bassName : ''}`;

                    return {
                        chordName: chordSymbol,
                        root: rootName,
                        formula: formula.name,
                        notes: sortedNotes.map(n => NOTE_NAMES[n % 12])
                    };
                }
            }
        }

        const bassName = NOTE_NAMES[sortedNotes[0] % 12];
        return { chordName: `${bassName} (Cluster/Custom)`, root: bassName, formula: "Complejo" };
    }
}

if (typeof module !== 'undefined') {
    module.exports = MidiChordDetector;
}
