import { OscillatorTypeParam } from './oscillator-type-param';
import { CustomAudioNode } from './custom-audio-node';

interface OscillatorOptions {
    type: OscillatorType;
    frequency: number;
    gain: number;
}

export class Oscillator extends CustomAudioNode {
    static numberOfInputs = 0;

    static numberOfOutputs = 1;

    private _oscillatorNode: OscillatorNode;

    public gain: AudioParam;

    public frequency: AudioParam;

    public type: OscillatorTypeParam;

    constructor(context: BaseAudioContext, { type, frequency, gain }: Partial<OscillatorOptions>) {
        super(context);

        const gainNode = new GainNode(context, { gain });
        this.gain = gainNode.gain;

        this._oscillatorNode = new OscillatorNode(context, { type, frequency });
        this.frequency = this._oscillatorNode.frequency;
        this.type = new OscillatorTypeParam(this._oscillatorNode);

        this._oscillatorNode.connect(gainNode);

        this._outputs[0] = gainNode;
    }

    start() {
        this._oscillatorNode.start();
    }

    stop() {
        this._oscillatorNode.stop();
    }
}
