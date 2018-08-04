import { connect } from 'react-redux';
import { setLfoFrequency } from '../reducers/lfo';

import Param from './Param';
import Knob from './Knob';


const LfoRate = ({ frequency, setLfoFrequency }) => (
    <Param title="Rate" key="rate" led={true}>
        <Knob
            value={frequency}
            onChange={ (e) => setLfoFrequency(e.value) }
        />
    </Param>
);

export default connect(
    (state) => ({
        frequency: state.lfo.frequency
    }),
    {
        setLfoFrequency,
    }
)(LfoRate);
