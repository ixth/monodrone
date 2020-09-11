import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLfoIntensity } from 'reducers/lfo';

import Param from 'components/Param';
import Knob from 'components/Knob';

const LfoInt = () => {
    const dispatch = useDispatch();
    const handleChange = useCallback((e) => { dispatch(setLfoIntensity(e.value)); }, [dispatch]);
    const intensity = useSelector((state) => state.lfo.intensity);
    return (
        <Param title="Int" key="int">
            <Knob value={intensity} onChange={handleChange} />
        </Param>
    );
};

export default LfoInt;
