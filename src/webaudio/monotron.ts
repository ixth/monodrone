import Delay from 'webaudio/delay';
import NoiseNode from 'webaudio/noise';
import Oscillator from 'webaudio/oscillator';

import { CustomAudioNode } from './custom-audio-node';

class Monotron extends CustomAudioNode {
    lfo: AudioNode;

    osc: AudioNode;

    noise: AudioNode;

    vcf: AudioNode;

    delay: AudioNode;

    output: AudioNode;

    constructor(context: BaseAudioContext) {
        super(context);

        const output = new GainNode(context, { gain: 0.5 });

        const lfo = new Oscillator(context, {
            type: 'triangle',
            frequency: 6,
            volume: 5,
        });

        const osc = new Oscillator(context, {
            type: 'sawtooth',
            volume: 0,
        });

        const noise = new NoiseNode(context, { volume: 0.01 });

        const vcf = new BiquadFilterNode(context, { frequency: 20000 });

        const delay = new Delay(context, {
            maxDelayTime: 2,
            delayTime: 0.05,
            feedback: 0.5,
        });

        lfo.connect(osc.frequency);

        osc.connect(vcf);
        noise.connect(vcf);

        vcf.connect(output);
        vcf.connect(delay);

        delay.connect(output);
        delay.connectFeedback(vcf);

        output.connect(context.destination);

        this.lfo = lfo;
        this.osc = osc;
        this.noise = noise;
        this.vcf = vcf;
        this.delay = delay;
        this.output = output;
    }
}

export default Monotron;
