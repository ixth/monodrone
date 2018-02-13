import { dispatcher } from './dispatcher.js';
import * as constants from './constants.js';

const makeAction = (type, value) => ({ type, value });
const makeBoundAction = type => value => dispatcher.dispatch(makeAction(type, value));

export const turnOn = makeBoundAction(constants.TURN_ON);
export const turnOff = makeBoundAction(constants.TURN_OFF);
export const setLfoFrequency = makeBoundAction(constants.SET_LFO_FREQUENCY);
export const setLfoIntensity = makeBoundAction(constants.SET_LFO_INTENSITY);
export const setLfoShape = makeBoundAction(constants.SET_LFO_SHAPE);
export const setOscGain = makeBoundAction(constants.SET_OSC_GAIN);
export const setOscFrequency = makeBoundAction(constants.SET_OSC_FREQUENCY);
export const setVcfCutoff = makeBoundAction(constants.SET_VCF_CUTOFF);
export const setDelayTime = makeBoundAction(constants.SET_DELAY_TIME);
export const setDelayFeedback = makeBoundAction(constants.SET_DELAY_FEEDBACK);
export const setVolume = makeBoundAction(constants.SET_VOLUME);
