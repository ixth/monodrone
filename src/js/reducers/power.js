import { createSlice } from '@reduxjs/toolkit';

export const initialState = true;

const { actions, reducer } = createSlice({
    name: 'power',
    initialState,
    reducers: {
        turnOn: () => true,
        turnOff: () => false,
    },
});

export const { turnOff, turnOn } = actions;

export default reducer;
