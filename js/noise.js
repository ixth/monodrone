export class NoiseNode {
    constructor(context) {
        this.type = NoiseNode.PinkNoise;

        const bufferSize = 4096;
        const processor = context.createScriptProcessor(bufferSize, 1, 1);
        processor.onaudioprocess = e => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = this._generator.next().value;
            }
        };

        const gain = context.createGain();
        processor.connect(gain);

        Object.assign(this, {
            context,
            gain: gain.gain,
            _processor: processor,
            _gain: gain,
        });
    }

    static *WhiteNoise() {
        while (true) {
            yield Math.random() * 2 - 1;
        }
    }

    static *PinkNoise() {
        const whiteGenerator = NoiseNode.WhiteNoise()
        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
        while (true) {
            const white = whiteGenerator.next().value;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            yield (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
    }

    static *BrownNoise() {
        const whiteGenerator = NoiseNode.WhiteNoise()
        let value = 0;
        while (true) {
            const white = whiteGenerator.next().value;
            value = (value + (0.02 * white)) / 1.02;
            yield value * 30;
        }
    }

    set type(value) {
        this._generator = value();
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
