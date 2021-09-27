import { CustomAudioNode } from './custom-audio-node';
import { generateSlice, PinkNoise } from './noise-generators';

const noiseGenerator = PinkNoise();

type NoiseNodeOptions = {
    volume: number;
};

class NoiseNode extends CustomAudioNode {
    private _gain: GainNode;

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

export default NoiseNode;
