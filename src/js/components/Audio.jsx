import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import addAudioNodeHook from 'webaudio/audio-node-hook';
import Monotron from 'webaudio/monotron';

addAudioNodeHook();

const audioContext = new AudioContext();
document.addEventListener('click', function cb() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
        document.removeEventListener('click', cb);
    }
});

const mapUnitToValue = (min, max, value) => min + value * (max - min);

const Audio = () => {
    const { delay, lfo, osc, power, vcf, volume } = useSelector((state) => state);
    const monotron = useMemo(() => new Monotron(audioContext), []);

    monotron.lfo.frequency.value = mapUnitToValue(1, 50, lfo.frequency);
    monotron.lfo.gain.value = mapUnitToValue(0, 10, lfo.intensity);
    monotron.lfo.type = lfo.shape;

    monotron.osc.gain.value = osc.gain;
    monotron.osc.frequency.value = osc.frequency;

    monotron.vcf.frequency.value = mapUnitToValue(20, 20000, vcf.cutoff);

    monotron.delay.delayTime.value = mapUnitToValue(.05, 2, delay.time);
    monotron.delay.feedback.value = mapUnitToValue(0, 1.5, delay.feedback);

    monotron.output.gain.value = power ? volume : 0;

    return null;
};

export default Audio;
