import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDelayTime } from 'reducers/delay';

import Param from 'components/Param';
import Knob from 'components/Knob';

const DelayTime = () => {
    const dispatch = useDispatch();
    const handleChange = useCallback(({ value }) => { dispatch(setDelayTime(value)); }, [dispatch]);
    const time = useSelector((state) => state.delay.time);

    return (
        <Param title="Time" key="time">
            <Knob value={time} onChange={handleChange} />
        </Param>
    );
};

export default DelayTime;
