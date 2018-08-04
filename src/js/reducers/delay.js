import createReducer from '../create-reducer';

export const DELAY_SET_TIME = 'DELAY_SET_TIME';
export const DELAY_SET_FEEDBACK = 'DELAY_SET_FEEDBACK';

export const setDelayTime = (time) => ({
    type: DELAY_SET_TIME,
    time,
});

export const setDelayFeedback = (feedback) => ({
    type: DELAY_SET_FEEDBACK,
    feedback,
});

export const initialState = {
    time: 0,
    feedback: 1/3,
};

export default createReducer(initialState, {
    [DELAY_SET_TIME]: (state, { time }) => ({ ...state, time }),
    [DELAY_SET_FEEDBACK]: (state, { feedback }) => ({ ...state, feedback }),
});
