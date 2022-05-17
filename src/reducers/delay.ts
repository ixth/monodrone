import { createSlice } from '@reduxjs/toolkit';

import { setField } from './setField';

export interface DelayState {
    time: number;
    feedback: number;
}

export const initialState = {
    time: 0,
    feedback: 1 / 3,
} as DelayState;

const { actions, reducer } = createSlice({
    name: 'delay',
    initialState,
    reducers: {
        setDelayTime: setField('time'),
        setDelayFeedback: setField('feedback'),
    },
});

export const { setDelayTime, setDelayFeedback } = actions;

export default reducer;
