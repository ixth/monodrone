import { addAudioNodeHook } from '../webaudio/audio-node.js';
import { Monotron } from '../webaudio/monotron.js';
import { store } from '../store.js';

import { Component } from '../lib/React.js';

export class Audio extends Component {
    componentDidMount() {
        addAudioNodeHook();

        const monotron = new Monotron(new AudioContext());

        store.on('change', () => {
            monotron.lfo.frequency.value = store.lfo.frequency;
            monotron.lfo.gain.value = store.lfo.intensity;
            monotron.lfo.type = store.lfo.shape;

            monotron.osc.gain.value = store.osc.gain;
            monotron.osc.frequency.value = store.osc.frequency;

            monotron.vcf.frequency.value = store.vcf.cutoff;

            monotron.delay.delayTime.value = store.delay.time;
            monotron.delay.feedback.value = store.delay.feedback;

            monotron.output.gain.value = store.standby ? 0 : store.volume;
        });
    }

    render() {
        return null;
    }
}
