import { Block, Param } from './block';
import { KnobComponent } from '../controls/knob';

import { setDelayTime, setDelayFeedback } from '../../actions';

export const Delay = ({ time, feedback }) => (
    <Block title='Delay'>
        <Param title='Time' key='time'>
            <KnobComponent
                {...time}
                onChange={(e) => { setDelayTime(e.value); }}
            />
        </Param>
        <Param title='Feedback' key='feedback'>
            <KnobComponent
                {...feedback}
                onChange={(e) => { setDelayFeedback(e.value); }}
            />
        </Param>
    </Block>
);

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
