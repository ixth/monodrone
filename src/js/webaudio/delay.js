class Delay {
    constructor(context, { maxDelayTime, delayTime, feedback }) {
        const gain = context.createGain();
        const delay = context.createDelay(maxDelayTime);

        if (delayTime !== undefined) {
            delay.delayTime.value = delayTime;
        }
        if (feedback !== undefined) {
            gain.gain.value = feedback;
        }

        delay.connect(gain);
        gain.connect(delay);

        this.context = context;
        this.delayTime = delay.delayTime;
        this.feedback = gain.gain;
        this._gain = gain;
        this._delay = delay;
    }

    connect(destination) {
        this._delay.connect(destination);
    }

    connectFeedback(destination) {
        this._gain.disconnect();
        this._gain.connect(destination);
    }

    __connectFrom(source) {
        source.connect(this._delay);
    }

    __disconnectFrom(source) {
        source.disconnect(this._delay);
    }
}

export default Delay;
