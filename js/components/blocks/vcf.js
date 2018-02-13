import { createElement as e } from 'react';

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

import { setVcfCutoff } from '../../actions.js';

export function Vcf(props) {
    return e(Block, { title: 'VCF' }, [
        e(Param, { title: 'Cutoff', key: 'cutoff' },
            e(KnobComponent, {
                min: props.cutoff.min,
                max: props.cutoff.max,
                value: props.cutoff.value,
                onChange: e => setVcfCutoff(e.value)
            })
        )
    ]);
}

Vcf.defaultProps = {
    cutoff: {
        min: 20,
        max: 20000
    }
};
