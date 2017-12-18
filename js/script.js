import { addAudioNodeHook } from './audio-node.js';
import { Param } from './param-view.js';
import { SequencerNode } from './sequencer.js';
import { Monotron } from './monotron.js';

addAudioNodeHook();

const context = new AudioContext();
const monotron = new Monotron(context);

const sequencer = new SequencerNode(context);
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
