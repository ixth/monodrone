import { NoiseNode } from './noise';
import { Oscillator } from './osc';
import { Delay } from './delay';

export class Monotron {
    constructor(context) {
        const output = context.createGain();

        const lfo = new Oscillator(context, {
            type: 'triangle',
            frequency: 6,
            volume: 5
        });

        const osc = new Oscillator(context, {
            type: 'sawtooth',
            volume: 0
        });

        const noise = new NoiseNode(context);

        const vcf = context.createBiquadFilter();

        const delay = new Delay(context, {
            maxDelayTime: 2,
            delayTime: .05,
            feedback: 0.5
        });

        lfo.connect(osc.frequency);

        osc.connect(vcf);

        noise.gain.value = .01;
        noise.connect(vcf);

        vcf.frequency.value = 20000;
        vcf.connect(output);
        vcf.connect(delay);

        delay.connect(output);
        delay.connectFeedback(vcf);

        output.gain.value = .5;
        output.connect(context.destination);

        Object.assign(this, {
            context,
            lfo,
            osc,
            noise,
            vcf,
            delay,
            output
        });
    }
}
