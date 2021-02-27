import { createSlice } from '@reduxjs/toolkit';
import { setField } from './setField';

export const initialState = {
    cutoff: 0.5,
};

const { actions, reducer } = createSlice({
    name: 'vcf',
    initialState,
    reducers: {
        setVcfCutoff: setField('cutoff'),
    },
});

export const { setVcfCutoff } = actions;

export default reducer;
