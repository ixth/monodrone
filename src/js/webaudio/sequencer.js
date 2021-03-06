const notesMap = {
    C: 523.25,
    b: 493.88,
    a: 440,
    g: 392,
    f: 349.23,
    e: 329.63,
    d: 293.67,
    c: 261.6,
};

class Sequencer {
    constructor() {
        this.bpm = 120;
    }

    _loop = () => {
        const beat = 60 / this.bpm;
        const startTime = this.destination.context.currentTime;
        const note = this._notes.next().value;
        this.destination.frequency.setValueAtTime(notesMap[note], startTime);
        this.destination.gain.setValueAtTime(1, startTime);
        this.destination.gain.setValueAtTime(0, startTime + (0.9 * beat) / 2);
        this._timeout = setTimeout(this._loop, (1000 * beat) / 2);
    };

    // eslint-disable-next-line no-restricted-syntax
    static *_getNotes(melody) {
        let i = 0;
        const notes = melody.split('');
        while (true) {
            // eslint-disable-next-line no-plusplus
            yield notes[i++ % notes.length];
        }
    }

    start() {
        this._notes = Sequencer._getNotes(this.melody);
        this._loop(this._notes);
    }

    stop() {
        clearTimeout(this._timeout);
        delete this._timeout;
    }

    connect(destination) {
        this.destination = destination;
    }
}

export default Sequencer;
