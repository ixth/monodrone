import { connect } from 'react-redux';
import { setVcfCutoff } from '../reducers/vcf';

import Param from './Param';
import Knob from './Knob';


const VcfCutoff = ({ cutoff, setVcfCutoff }) => (
    <Param title="Cutoff" key="cutoff">
        <Knob
            value={cutoff}
            onChange={ (e) => setVcfCutoff(e.value) }
        />
    </Param>
);

export default connect(
    (state) => ({
        cutoff: state.vcf.cutoff,
    }),
    {
        setVcfCutoff,
    }
)(VcfCutoff);