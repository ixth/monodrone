import { connect } from 'react-redux';
import { setDelayTime } from 'reducers/delay';

import Param from 'components/Param';
import Knob from 'components/Knob';


const DelayTime = ({ time, setDelayTime }) => (
    <Param title="Time" key="time">
        <Knob
            value={time}
            onChange={ (e) => setDelayTime(e.value) }
        />
    </Param>
);

export default connect(
    (state) => ({
        time: state.delay.time,
    }),
    {
        setDelayTime,
    }
)(DelayTime);
