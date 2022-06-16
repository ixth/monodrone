import { CustomAudioNode } from './custom-audio-node';
import { generateSlice, PinkNoise } from './noise-generators';

const noiseGenerator = PinkNoise();

interface NoiseNodeOptions {
    volume: number;
}

class NoiseNode extends CustomAudioNode {
    private readonly _gain: GainNode;

    gain: AudioParam;

    generator = noiseGenerator;

    constructor(context: BaseAudioContext, { volume }: NoiseNodeOptions) {
        super(context);

        const gain = new GainNode(context, { gain: volume });
        this.gain = gain.gain;
        this._gain = gain;

        this.initScriptProcessor().connect(gain);
    }

    initScriptProcessor(): ScriptProcessorNode {
        const bufferSize = 4096;
        const processor = this.context.createScriptProcessor(bufferSize, 1, 1);
        processor.onaudioprocess = (e) => {
            e.outputBuffer.getChannelData(0).set(generateSlice(this.generator, bufferSize));
        };
        return processor;
    }

    connect(destination: AudioNode): void {
        this._gain.connect(destination);
    }

    __connectFrom(source: AudioNode): AudioNode | void {
        source.connect(this._gain);
    }

    __disconnectFrom(source: AudioNode): void {
        source.disconnect(this._gain);
    }
}

export default NoiseNode;
