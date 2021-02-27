import { createSlice } from '@reduxjs/toolkit';
import { setField } from './setField';

export const initialState = {
    frequency: 440 / (20000 - 20),
    gain: 0,
};

const { actions, reducer } = createSlice({
    name: 'osc',
    initialState,
    reducers: {
        setOscFrequency: setField('frequency'),
        setOscGain: setField('gain'),
    },
});

export const { setOscFrequency, setOscGain } = actions;

export default reducer;
