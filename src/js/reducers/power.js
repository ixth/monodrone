import createReducer from '../create-reducer';

export const POWER_ON = 'POWER_ON';
export const POWER_OFF = 'POWER_OFF';

export const turnOn = () => ({
    type: POWER_ON,
});

export const turnOff = () => ({
    type: POWER_OFF,
});

export const initialState = true;

export default createReducer(initialState, {
    [POWER_ON]: () => true,
    [POWER_OFF]: () => false,
});
