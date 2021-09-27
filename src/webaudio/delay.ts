import { CustomAudioNode } from './custom-audio-node';

type DelayOptions = {
    maxDelayTime: number;
    delayTime: number;
    feedback: number;
};

class Delay extends CustomAudioNode {
    delayTime: AudioParam;

    feedback: AudioParam;

    private _gain: GainNode;

    private _delay: DelayNode;

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

    connect(destination: AudioNode | AudioParam) {
        return this._delay.connect(destination);
    }

    connectFeedback(destination: AudioNode) {
        this._gain.disconnect();
        this._gain.connect(destination);
    }

    __connectFrom(source: AudioNode) {
        source.connect(this._delay);
    }

    __disconnectFrom(source: AudioNode) {
        source.disconnect(this._delay);
    }
}

export default Delay;
