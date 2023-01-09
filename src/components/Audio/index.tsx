import { useEffect, useMemo, VFC } from 'react';

import { patchAudioNode } from '@ixth/wa-components/custom-audio-node';
import { Monotron } from '@ixth/wa-components/monotron';

import { mapUnitToValue, resumeContextOnInteraction } from './utils';

patchAudioNode();

const audioContext = new AudioContext();
resumeContextOnInteraction(audioContext);

interface AudioProps {
    delay: { time: number; feedback: number };
    lfo: { frequency: number; intensity: number; shape: OscillatorType };
    osc: { gain: number; frequency: number };
    power: boolean;
    vcf: { cutoff: number };
    volume: number;
}

const Audio: VFC<AudioProps> = ({ delay, lfo, osc, power, vcf, volume }) => {
    const monotron = useMemo(() => new Monotron(audioContext), []);

    useEffect(() => {
        monotron.connect(audioContext.destination);
    }, [monotron]);

    monotron.gain.value = power ? volume : 0;

    monotron.lfoRate.value = mapUnitToValue(1, 50, lfo.frequency);
    monotron.lfoInt.value = mapUnitToValue(0, 10, lfo.intensity);
    monotron.lfoType.value = lfo.shape;

    monotron.vcfCutoff.value = mapUnitToValue(20, 20000, vcf.cutoff);

    monotron.delayTime.value = mapUnitToValue(0.05, 2, delay.time);
    monotron.delayFeedback.value = mapUnitToValue(0, 1.5, delay.feedback);

    monotron.oscGate.value = Math.round(osc.gain);
    monotron.oscPitch.value = osc.frequency;

    return null;
};

export default Audio;
