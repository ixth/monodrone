import createReducer from 'create-reducer';

export const VCF_SET_CUTOFF = 'VCF_SET_CUTOFF';

export const setVcfCutoff = (cutoff) => ({
    type: VCF_SET_CUTOFF,
    cutoff,
});

export const initialState = {
    cutoff: 0.5,
};

export default createReducer(initialState, {
    [VCF_SET_CUTOFF]: (state, { cutoff }) => ({ ...state, cutoff }),
});
