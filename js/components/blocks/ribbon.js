import { createElement as e } from 'react';

import { setOscGain, setOscFrequency } from '../../actions.js';
import { Ribbon as RibbonControl } from '../controls/ribbon.js';

export function Ribbon() {
    return e(RibbonControl, {
        onChange: e => {
            setOscGain(e.pressed ? 1 : 0);
            setOscFrequency(23 * Math.pow(1.886525, 8 * e.value));
        }
    });
}
