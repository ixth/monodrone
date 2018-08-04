import { combineReducers } from 'redux';

import power from './reducers/power';
import lfo from './reducers/lfo';
import osc from './reducers/osc';
import vcf from './reducers/vcf';
import delay from './reducers/delay';
import volume from './reducers/volume';

export default combineReducers({
    power,
    lfo,
    osc,
    vcf,
    delay,
    volume,
});
