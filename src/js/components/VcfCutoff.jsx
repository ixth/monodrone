import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVcfCutoff } from 'reducers/vcf';

import Param from 'components/Param';
import Knob from 'components/Knob';

const VcfCutoff = () => {
    const dispatch = useDispatch();
    const handleChange = useCallback(({ value }) => { dispatch(setVcfCutoff(value)); }, [dispatch]);
    const cutoff = useSelector((state) => state.vcf.cutoff);

    return (
        <Param title="Cutoff" key="cutoff">
            <Knob value={cutoff} onChange={handleChange} />
        </Param>
    );
};

export default VcfCutoff;
