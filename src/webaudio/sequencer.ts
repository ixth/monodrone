// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type Oscillator from './oscillator';

const notesMap: Record<string, number> = {
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
    bpm = 120;

    destination?: Oscillator;

    melody?: string;

    private _notes?: ReturnType<typeof Sequencer._getNotes>;

    private _timeout?: ReturnType<typeof setTimeout>;

    _loop = (): void => {
        const beat = 60 / this.bpm;
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        const note = this._notes?.next().value!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        const startTime = this.destination?.context.currentTime!;
        this.destination?.frequency.setValueAtTime(notesMap[note], startTime);
        this.destination?.gain.setValueAtTime(1, startTime);
        this.destination?.gain.setValueAtTime(0, startTime + (0.9 * beat) / 2);
        this._timeout = setTimeout(this._loop, (1000 * beat) / 2);
    };

    static *_getNotes(melody: string): Generator<string, string, string> {
        let i = 0;
        const notes = melody.split('');
        while (true) {
            // eslint-disable-next-line no-plusplus
            yield notes[i++ % notes.length];
        }
    }

    start(): void {
        this._notes = Sequencer._getNotes(this.melody);
        this._loop();
    }

    stop(): void {
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            delete this._timeout;
        }
    }

    connect(destination: Oscillator): void {
        this.destination = destination;
    }
}

export default Sequencer;
