import { setLfoFrequency, setLfoIntensity } from '../../actions';

import { Block, Param } from './block';
import { KnobComponent } from '../controls/knob';

export const Lfo = ({ frequency, intensity }) => (
    <Block title='LFO'>
        <Param title='Rate' key='rate' led={true}>
            <KnobComponent
                {...frequency}
                onChange={ (e) => { setLfoFrequency(e.value); } }
            />
        </Param>
        <Param title='Int' key='int'>
            <KnobComponent
                {...intensity}
                onChange={ (e) => { setLfoIntensity(e.value); } }
            />
        </Param>
    </Block>
);

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
