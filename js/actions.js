import { dispatcher } from './dispatcher.js';
import { constants } from './constants.js';

export const actions = {
    turnOn: () => {
        dispatcher.dispatch({
            type: constants.TURN_ON
        });
    },
    turnOff: () => {
        dispatcher.dispatch({
            type: constants.TURN_OFF
        });
    },
    setLfoFrequency: value => {
        dispatcher.dispatch({
            type: constants.SET_LFO_FREQUENCY,
            value
        });
    },
    setLfoIntensity: value => {
        dispatcher.dispatch({
            type: constants.SET_LFO_INTENSITY,
            value
        });
    },
    setLfoShape: value => {
        actions.turnOn();
        dispatcher.dispatch({
            type: constants.SET_LFO_SHAPE,
            value
        });
    },
    setOscGain: value => {
        dispatcher.dispatch({
            type: constants.SET_OSC_GAIN,
            value
        });
    },
    setOscFrequency: value => {
        dispatcher.dispatch({
            type: constants.SET_OSC_FREQUENCY,
            value
        });
    },
    setVcfCutoff: value => {
        dispatcher.dispatch({
            type: constants.SET_VCF_CUTOFF,
            value
        });
    },
    setDelayTime: value => {
        dispatcher.dispatch({
            type: constants.SET_DELAY_TIME,
            value
        });
    },
    setDelayFeedback: value => {
        dispatcher.dispatch({
            type: constants.SET_DELAY_FEEDBACK,
            value
        });
    },
    setVolume: value => {
        dispatcher.dispatch({
            type: constants.SET_VOLUME,
            value
        });
    }
};
