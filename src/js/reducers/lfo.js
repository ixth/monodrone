import { createSlice } from '@reduxjs/toolkit';
import { setField } from './setField';

export const initialState = {
    frequency: 0.8,
    intensity: 0.5,
    shape: 'sawtooth',
};

const { actions, reducer } = createSlice({
    name: 'lfo',
    initialState,
    reducers: {
        setLfoFrequency: setField('frequency'),
        setLfoIntensity: setField('intensity'),
        setLfoShape: setField('shape'),
    },
});

export const { setLfoFrequency, setLfoIntensity, setLfoShape } = actions;

export default reducer;
