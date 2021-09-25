import { combineReducers } from 'redux';

import delay from 'reducers/delay';
import lfo from 'reducers/lfo';
import osc from 'reducers/osc';
import power from 'reducers/power';
import vcf from 'reducers/vcf';
import volume from 'reducers/volume';

export const rootReducer = combineReducers({
    power,
    lfo,
    osc,
    vcf,
    delay,
    volume,
});

export type RootState = ReturnType<typeof rootReducer>;
