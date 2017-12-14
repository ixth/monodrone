class Monotron {
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

const context = new AudioContext();
const monotron = new Monotron(context);

var sequencer = new SequencerNode(context);
sequencer.connect(monotron.osc);
sequencer.bpm = 91;
sequencer.melody = [
    'eaCeaCea',
    'dgbdgbdg',
    'cfacfacf',
    'dfadfadf'
].join('');

for (let param of document.querySelectorAll('.param')) {
    new Param(param);
}

const form = document.querySelector('form');

form.elements['vcf-cutoff'].addEventListener('input', function (e) {
    monotron.vcf.frequency.value = this.value;
});

form.elements['lfo-form'].forEach(function (el) {
    el.addEventListener('change', function (e) {
        if (this.value === 'off') {
            monotron.output.gain.value = 0;
            return;
        } else {
            monotron.output.gain.value = form.elements['volume'].value;
            monotron.lfo.type = this.value;
        }
    });
});

form.elements['lfo-freq'].addEventListener('input', function (e) {
    monotron.lfo.frequency.value = this.value;
});

form.elements['lfo-intensity'].addEventListener('input', function (e) {
    monotron.lfo.gain.value = this.value;
});

const getFrequency = p => 23 * Math.pow(1.886525, 8 * p);

document.getElementById('pitch').addEventListener('mouseleave', function (e) {
    monotron.osc.gain.value = 0;
});

document.getElementById('pitch').addEventListener('mousedown', function (e) {
    const rect = this.getBoundingClientRect();
    monotron.osc.frequency.value = getFrequency((e.clientX - rect.left) / rect.width);
    monotron.osc.gain.value = 1;
});

document.getElementById('pitch').addEventListener('mousemove', function (e) {
    if (e.buttons & 1) {
        const rect = this.getBoundingClientRect();
        monotron.osc.frequency.value = getFrequency((e.clientX - rect.left) / rect.width);
        monotron.osc.gain.value = 1;
    }
});

document.getElementById('pitch').addEventListener('mouseup', function (e) {
    monotron.osc.gain.value = 0;
});

form.elements['volume'].addEventListener('input', function (e) {
    monotron.output.gain.value = this.value;
});

form.elements['delay-time'].addEventListener('input', function (e) {
    monotron.delay.delayTime.value = this.value / 1000;
});

form.elements['delay-feedback'].addEventListener('input', function (e) {
    monotron.delay.feedback.value = this.value;
});

form.elements['demo'].addEventListener('click', _ => {
    if (sequencer._timeout) {
        sequencer.stop();
    } else {
        sequencer.start();
    }
});