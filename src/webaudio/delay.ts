import { CustomAudioNode } from './custom-audio-node';

interface DelayOptions {
    maxDelayTime: number;
    delayTime: number;
    feedback: number;
}

class Delay extends CustomAudioNode {
    delayTime: AudioParam;

    feedback: AudioParam;

    private readonly _gain: GainNode;

    private readonly _delay: DelayNode;

    constructor(
        context: BaseAudioContext,
        { maxDelayTime, delayTime, feedback }: Partial<DelayOptions>
    ) {
        super(context);

        const delay = new DelayNode(context, { delayTime, maxDelayTime });
        this.delayTime = delay.delayTime;
        this._delay = delay;

        const gain = new GainNode(context, { gain: feedback });
        this.feedback = gain.gain;
        this._gain = gain;

        delay.connect(gain).connect(delay);
    }

    connect(destination: AudioNode | AudioParam): void {
        return this._delay.connect(destination);
    }

    connectFeedback(destination: AudioNode): void {
        this._gain.disconnect();
        this._gain.connect(destination);
    }

    __connectFrom(source: AudioNode): AudioNode | void {
        source.connect(this._delay);
    }

    __disconnectFrom(source: AudioNode): void {
        source.disconnect(this._delay);
    }
}

export default Delay;
