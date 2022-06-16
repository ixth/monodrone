// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createSlice } from '@reduxjs/toolkit';

export const initialState = 0.5;

const { actions, reducer } = createSlice({
    name: 'volume',
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setVolume: (_, { payload }) => payload,
    },
});

export const { setVolume } = actions;

export default reducer;
