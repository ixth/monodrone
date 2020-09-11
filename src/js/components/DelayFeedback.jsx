import { connect } from 'react-redux';
import { setDelayFeedback } from 'reducers/delay';

import Param from 'components/Param';
import Knob from 'components/Knob';


const DelayFeedback = ({ feedback, setDelayFeedback }) => (
    <Param title="Feedback" key="feedback">
        <Knob
            value={feedback}
            onChange={ (e) => setDelayFeedback(e.value) }
        />
    </Param>
);

export default connect(
    (state) => ({
        feedback: state.delay.feedback,
    }),
    {
        setDelayFeedback,
    }
)(DelayFeedback);
