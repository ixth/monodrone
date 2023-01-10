import { CustomAudioNode } from './custom-audio-node';

interface DelayOptions {
    maxDelayTime: number;
    delayTime: number;
    feedback: number;
}

export class FeedbackDelay extends CustomAudioNode {
    static numberOfInputs = 1;

    static numberOfOutputs = 2;

    public delayTime: AudioParam;

    public feedback: AudioParam;

    constructor(
        context: BaseAudioContext,
        { maxDelayTime, delayTime, feedback }: Partial<DelayOptions>
    ) {
        super(context);

        const gainNode = new GainNode(context, { gain: feedback });
        this.feedback = gainNode.gain;

        const delayNode = new DelayNode(context, { delayTime, maxDelayTime });
        this.delayTime = delayNode.delayTime;

        delayNode.connect(gainNode);

        this._inputs[0] = delayNode;
        this._outputs[0] = delayNode;
        this._outputs[1] = gainNode;
    }
}
