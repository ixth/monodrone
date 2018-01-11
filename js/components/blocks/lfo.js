import { createElement as e } from '../../lib/React.js';

import { actions } from '../../actions.js';

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

export function Lfo(props) {
    return e(Block, { title: 'LFO' }, [
        e(Param, { title: 'Rate', led: true, key: 'rate' },
            e(KnobComponent, {
                min: props.frequency.min,
                max: props.frequency.max,
                value: props.frequency.value,
                onChange: e => actions.setLfoFrequency(e.value)
            })
        ),
        e(Param, { title: 'Int', key: 'int' },
            e(KnobComponent, {
                min: props.intensity.min,
                max: props.intensity.max,
                value: props.intensity.value,
                onChange: e => actions.setLfoIntensity(e.value)
            })
        )
    ]);
}

Lfo.defaultProps = {
    frequency: {
        min: 1,
        max: 50
    },
    intensity: {
        min: 0,
        max: 10
    }
};
