import { CustomAudioNode } from './custom-audio-node';

type OscillatorOptions = {
    type: OscillatorType;
    frequency: number;
    volume: number;
};

class Oscillator extends CustomAudioNode {
    gain: AudioParam;

    frequency: AudioParam;

    private _gain: GainNode;

    private _oscillator: OscillatorNode;

    constructor(
        context: BaseAudioContext,
        { type, frequency, volume }: Partial<OscillatorOptions>
    ) {
        super(context);

        const gain = new GainNode(context, { gain: volume });
        this.gain = gain.gain;
        this._gain = gain;

        const oscillator = new OscillatorNode(context, { type, frequency });
        this.frequency = oscillator.frequency;
        this._oscillator = oscillator;

        oscillator.start();
        oscillator.connect(gain);
    }

    set type(value: OscillatorType) {
        this._oscillator.type = value;
    }

    connect(destination: AudioNode) {
        this._gain.connect(destination);
    }

    __connectFrom(source: AudioNode) {
        source.connect(this._gain);
    }

    __disconnectFrom(source: AudioNode) {
        source.disconnect(this._gain);
    }
}

export default Oscillator;
