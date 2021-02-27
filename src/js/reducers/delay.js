import { createSlice } from '@reduxjs/toolkit';
import { setField } from './setField';

export const initialState = {
    time: 0,
    feedback: 1 / 3,
};

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
