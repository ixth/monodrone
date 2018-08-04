import createReducer from '../create-reducer';

export const VOLUME_SET_VALUE = 'VOLUME_SET_VALUE';

export const setVolumeAction = (value) => ({
    type: VOLUME_SET_VALUE,
    value,
});

export const initialState = .5;

export default createReducer(initialState, {
    [VOLUME_SET_VALUE]: (_, { value }) => value,
});
