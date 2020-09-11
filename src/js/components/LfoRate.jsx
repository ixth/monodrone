import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLfoFrequency } from 'reducers/lfo';

import Param from 'components/Param';
import Knob from 'components/Knob';

const LfoRate = () => {
    const dispatch = useDispatch();
    const handleChange = useCallback((e) => { dispatch(setLfoFrequency(e.value)); }, [dispatch]);
    const frequency = useSelector((state) => state.lfo.frequency);
    return (
        <Param title="Rate" key="rate" led={true}>
            <Knob value={frequency} onChange={handleChange} />
        </Param>
    );
};

export default LfoRate;
