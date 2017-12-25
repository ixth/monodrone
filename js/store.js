import { dispatcher } from './dispatcher.js';
import { constants } from './constants.js';
import { emitter } from './lib/events.js';

export const store = emitter({
    standby: false,
    lfo: {
        frequency: 40,
        intensity: 5,
        shape: 'sawtooth'
    },
    osc: {
        gain: 0,
        frequency: 440
    },
    vcf: {
        cutoff: 20000
    },
    delay: {
        time: .05,
        feedback: .5
    },
    volume: .5
});

dispatcher.register(payload => {
    switch (payload.type) {
        case constants.TURN_ON:
            store.standby = false;
            break;

        case constants.TURN_OFF:
            store.standby = true;
            break;

        case constants.SET_LFO_FREQUENCY:
            store.lfo.frequency = payload.value;
            break;

        case constants.SET_LFO_INTENSITY:
            store.lfo.intensity = payload.value;
            break;

        case constants.SET_LFO_SHAPE:
            store.lfo.shape = payload.value;
            break;

        case constants.SET_OSC_FREQUENCY:
            store.osc.frequency = payload.value;
            break;

        case constants.SET_OSC_GAIN:
            store.osc.gain = payload.value;
            break;

        case constants.SET_VCF_CUTOFF:
            store.vcf.cutoff = payload.value;
            break;

        case constants.SET_DELAY_TIME:
            store.delay.time = payload.value;
            break;

        case constants.SET_DELAY_FEEDBACK:
            store.delay.feedback = payload.value;
            break;

        case constants.SET_VOLUME:
            store.volume = payload.value;
            break;
    }

    store.emit('change');

    return true;
});
