import { createSlice } from '@reduxjs/toolkit';

export const initialState = 0.5;

const { actions, reducer } = createSlice({
    name: 'volume',
    initialState,
    reducers: {
        setVolume: (_, { payload }) => payload,
    },
});

export const { setVolume } = actions;

export default reducer;
