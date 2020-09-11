import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDelayFeedback } from 'reducers/delay';

import Param from 'components/Param';
import Knob from 'components/Knob';

const DelayFeedback = () => {
    const dispatch = useDispatch();
    const handleChange = useCallback(({ value }) => dispatch(setDelayFeedback(value)), [dispatch]);
    const feedback = useSelector((state) => state.delay.feedback);

    return (
        <Param title="Feedback" key="feedback">
            <Knob value={feedback} onChange={handleChange} />
        </Param>
    );
};

export default DelayFeedback;
