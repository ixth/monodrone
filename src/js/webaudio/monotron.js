import NoiseNode from 'webaudio/noise';
import Oscillator from 'webaudio/osc';
import Delay from 'webaudio/delay';

class Monotron {
    constructor(context) {
        const output = context.createGain();

        const lfo = new Oscillator(context, {
            type: 'triangle',
            frequency: 6,
            volume: 5,
        });

        const osc = new Oscillator(context, {
            type: 'sawtooth',
            volume: 0,
        });

        const noise = new NoiseNode(context);

        const vcf = context.createBiquadFilter();

        const delay = new Delay(context, {
            maxDelayTime: 2,
            delayTime: 0.05,
            feedback: 0.5,
        });

        lfo.connect(osc.frequency);

        osc.connect(vcf);

        noise.gain.value = 0.01;
        noise.connect(vcf);

        vcf.frequency.value = 20000;
        vcf.connect(output);
        vcf.connect(delay);

        delay.connect(output);
        delay.connectFeedback(vcf);

        output.gain.value = 0.5;
        output.connect(context.destination);

        this.context = context;
        this.lfo = lfo;
        this.osc = osc;
        this.noise = noise;
        this.vcf = vcf;
        this.delay = delay;
        this.output = output;
    }
}

export default Monotron;
