class NoiseNode {
    constructor(context) {
        this.type = NoiseNode.PinkNoise;

        const bufferSize = 4096;
        const processor = context.createScriptProcessor(bufferSize, 1, 1);
        processor.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            const buffer = Array.from({ length: bufferSize }, () => this._generator.next().value);
            output.set(buffer);
        };

        const gain = context.createGain();
        processor.connect(gain);

        this.context = context;
        this.gain = gain.gain;
        this._processor = processor;
        this._gain = gain;
    }

    // eslint-disable-next-line no-restricted-syntax
    static *WhiteNoise() {
        while (true) {
            yield Math.random() * 2 - 1;
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    static *PinkNoise() {
        const whiteGenerator = NoiseNode.WhiteNoise();
        let b0 = 0;
        let b1 = 0;
        let b2 = 0;
        let b3 = 0;
        let b4 = 0;
        let b5 = 0;
        let b6 = 0;
        while (true) {
            const white = whiteGenerator.next().value;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.969 * b2 + white * 0.153852;
            b3 = 0.8665 * b3 + white * 0.3104856;
            b4 = 0.55 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.016898;
            yield (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    static *BrownNoise() {
        const whiteGenerator = NoiseNode.WhiteNoise();
        let value = 0;
        while (true) {
            const white = whiteGenerator.next().value;
            value = (value + 0.02 * white) / 1.02;
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

export default NoiseNode;
