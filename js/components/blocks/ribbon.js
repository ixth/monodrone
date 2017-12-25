import React from '../../lib/React.js';
const e = React.createElement;

import { actions } from '../../actions.js';
import { Ribbon as RibbonControl } from '../controls/ribbon.js';

export function Ribbon() {
    return e(RibbonControl, {
        onChange: e => {
            actions.setOscGain(e.pressed ? 1 : 0);
            actions.setOscFrequency(23 * Math.pow(1.886525, 8 * e.value));
        }
    });
}
