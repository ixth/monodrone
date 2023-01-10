import { pink } from '@thi.ng/colored-noise';

import { CustomAudioNode } from './custom-audio-node';

interface NoiseNodeOptions {
    gain: number;
}

function take<T>(g: Generator<T, never>, length: number): T[] {
    return Array.from({ length }, () => g.next().value);
}

export class NoiseNode extends CustomAudioNode {
    static numberOfInputs = 0;

    static numberOfOutputs = 1;

    public gain: AudioParam;

    private _generator = pink() as Generator<number, never>;

    constructor(context: BaseAudioContext, { gain }: NoiseNodeOptions) {
        super(context);

        const gainNode = new GainNode(context, { gain });
        this.gain = gainNode.gain;

        const processorNode = this.initScriptProcessor();
        processorNode.connect(gainNode);

        this._outputs[0] = gainNode;
    }

    initScriptProcessor(): ScriptProcessorNode {
        const bufferSize = 4096;
        const processor = this.context.createScriptProcessor(bufferSize, 1, 1);
        processor.onaudioprocess = (e) => {
            e.outputBuffer.getChannelData(0).set(take(this._generator, bufferSize));
        };
        return processor;
    }
}
