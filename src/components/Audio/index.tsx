import { useMemo, VFC } from 'react';

import { patchAudioNode } from 'webaudio/custom-audio-node';
import Monotron from 'webaudio/monotron';

import { mapUnitToValue } from './utils';

patchAudioNode();

const audioContext = new AudioContext();
document.addEventListener('click', function cb() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
        document.removeEventListener('click', cb);
    }
});

type AudioProps = {
    delay: { time: number; feedback: number };
    lfo: { frequency: number; intensity: number; shape: OscillatorType };
    osc: { gain: number; frequency: number };
    power: boolean;
    vcf: { cutoff: number };
    volume: number;
};

const Audio: VFC<AudioProps> = ({ delay, lfo, osc, power, vcf, volume }) => {
    const monotron = useMemo(() => new Monotron(audioContext), []);

    monotron.lfo.frequency.value = mapUnitToValue(1, 50, lfo.frequency);
    monotron.lfo.gain.value = mapUnitToValue(0, 10, lfo.intensity);
    monotron.lfo.type = lfo.shape;

    monotron.osc.gain.value = osc.gain;
    monotron.osc.frequency.value = osc.frequency;

    monotron.vcf.frequency.value = mapUnitToValue(20, 20000, vcf.cutoff);

    monotron.delay.delayTime.value = mapUnitToValue(0.05, 2, delay.time);
    monotron.delay.feedback.value = mapUnitToValue(0, 1.5, delay.feedback);

    monotron.output.gain.value = power ? volume : 0;

    return null;
};

export default Audio;
