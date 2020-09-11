import { connect } from 'react-redux';
import { setLfoIntensity } from 'reducers/lfo';

import Param from 'components/Param';
import Knob from 'components/Knob';


const LfoInt = ({ intensity, setLfoIntensity }) => (
    <Param title="Int" key="int">
        <Knob
            value={intensity}
            onChange={ (e) => setLfoIntensity(e.value) }
        />
    </Param>
);

export default connect(
    (state) => ({
        intensity: state.lfo.intensity
    }),
    {
        setLfoIntensity,
    }
)(LfoInt);
