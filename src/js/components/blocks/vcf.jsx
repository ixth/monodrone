import { Block, Param } from './block';
import { KnobComponent } from '../controls/knob';

import { setVcfCutoff } from '../../actions';

export const Vcf = ({ cutoff }) => (
    <Block title='VCF'>
        <Param title='Cutoff' key='cutoff'>
            <KnobComponent
                {...cutoff}
                onChange={(e) => { setVcfCutoff(e.value); }}
            />
        </Param>
    </Block>
);

Vcf.defaultProps = {
    cutoff: {
        min: 20,
        max: 20000
    }
};
