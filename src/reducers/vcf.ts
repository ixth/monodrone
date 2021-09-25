import { createSlice } from '@reduxjs/toolkit';

import { setField } from './setField';

export type VcfState = { cutoff: number };

export const initialState = { cutoff: 0.5 } as VcfState;

const { actions, reducer } = createSlice({
    name: 'vcf',
    initialState,
    reducers: {
        setVcfCutoff: setField('cutoff'),
    },
});

export const { setVcfCutoff } = actions;

export default reducer;
