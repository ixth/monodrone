import createReducer from '../create-reducer';

export const LFO_SET_FREQUENCY = 'LFO_SET_FREQUENCY';
export const LFO_SET_INTENSITY = 'LFO_SET_INTENSITY';
export const LFO_SET_SHAPE = 'LFO_SET_SHAPE';

export const setLfoFrequency = (frequency) => ({
    type: LFO_SET_FREQUENCY,
    frequency,
});

export const setLfoIntensity = (intensity) => ({
    type: LFO_SET_INTENSITY,
    intensity,
});

export const setLfoShape = (shape) => ({
    type: LFO_SET_SHAPE,
    shape,
});

export const initialState = {
    frequency: .8,
    intensity: .5,
    shape: 'sawtooth',
};

export default createReducer(initialState, {
    [LFO_SET_FREQUENCY]: (state, { frequency }) => ({ ...state, frequency }),
    [LFO_SET_INTENSITY]: (state, { intensity }) => ({ ...state, intensity }),
    [LFO_SET_SHAPE]: (state, { shape }) => ({ ...state, shape }),
});
