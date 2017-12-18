const notesMap = {
    'C': 523.25,
    'b': 493.88,
    'a': 440,
    'g': 392,
    'f': 349.23,
    'e': 329.63,
    'd': 293.67,
    'c': 261.6
};

export class SequencerNode {
    constructor(context) {
        this.context = context;
        this.bpm = 120;
    }

    static *_getNotes(melody) {
        let i = 0;
        const notes = melody.split('');
        while (true) {
            yield notes[i++ % notes.length];
        }
    }

    _loop() {
        const beat = 60 / this.bpm;
        const startTime = this.context.currentTime;
        const note = this._notes.next().value;
        this.frequency.setValueAtTime(notesMap[note], startTime);
        this.gain.setValueAtTime(1, startTime);
        this.gain.setValueAtTime(0, startTime + .9 * beat / 2);
        this._timeout = setTimeout(this._loop.bind(this, this._notes), 1000 * beat / 2);
    }

    start() {
        this._notes = SequencerNode._getNotes(this.melody);
        this._loop(this._notes);
    }

    stop() {
        clearTimeout(this._timeout);
        delete this._timeout;
    }

    connect(destination) {
        Object.assign(this, {
            frequency: destination.frequency,
            gain: destination.gain,
        });
    }
}
