import { createElement as e } from 'react';

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

import { setDelayTime, setDelayFeedback } from '../../actions.js';

export function Delay(props) {
    return e(Block, { title: 'Delay' }, [
        e(Param, { title: 'Time', key: 'time' },
            e(KnobComponent, {
                min: props.time.min,
                max: props.time.max,
                value: props.time.value,
                onChange: e => setDelayTime(e.value)
            })
        ),
        e(Param, { title: 'Feedback', key: 'feedback' },
            e(KnobComponent, {
                min: props.feedback.min,
                max: props.feedback.max,
                value: props.feedback.value,
                onChange: e => setDelayFeedback(e.value)
            })
        )
    ]);
}

Delay.defaultProps = {
    time: {
        min: .05,
        max: 2
    },
    feedback: {
        min: 0,
        max: 1.5
    }
};
