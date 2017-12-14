class Oscillator {
    constructor(context, {type, frequency, volume}) {
        const gain = context.createGain();
        const oscillator = context.createOscillator();

        if (type) {
            oscillator.type = type;
        }
        if (frequency !== undefined) {
            oscillator.frequency.value = frequency;
        }
        if (volume !== undefined) {
            gain.gain.value = volume;
        }

        oscillator.start();
        oscillator.connect(gain);

        Object.assign(this, {
            context,
            _gain: gain,
            _oscillator: oscillator,
            gain: gain.gain,
            frequency: oscillator.frequency,
        });
    }

    set type(value) {
        this._oscillator.type = value;
    }

    connect(destination) {
        this._gain.connect(destination);
    }

    __connectFrom(source) {
        source.connect(this._gain);
    }

    __disconnectFrom(source) {
        source.disconnect(this._gain);
    }
}
