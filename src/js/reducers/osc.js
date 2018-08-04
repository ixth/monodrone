import createReducer from '../create-reducer';

export const OSC_SET_GAIN = 'OSC_SET_GAIN';
export const OSC_SET_FREQUENCY = 'OSC_SET_FREQUENCY';

export const setOscGain = (gain) => ({
    type: OSC_SET_GAIN,
    gain,
});

export const setOscFrequency = (frequency) => ({
    type: OSC_SET_FREQUENCY,
    frequency,
});

export const initialState = {
    gain: 0,
    frequency: 440 / (20000 - 20),
};

export default createReducer(initialState, {
    [OSC_SET_GAIN]: (state, { gain }) => ({ ...state, gain }),
    [OSC_SET_FREQUENCY]: (state, { frequency }) => ({ ...state, frequency }),
});
