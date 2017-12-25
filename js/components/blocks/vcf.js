import React from '../../lib/React.js';
const e = React.createElement;
const Component = React.Component;

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

import { store } from '../../store.js';
import { actions } from '../../actions.js';

export class Vcf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cutoff: store.vcf.cutoff
        };
    }

    componentDidMount() {
        store.on('change', () => {
            this.setState({
                cutoff: store.vcf.cutoff
            });
        });
    }

    render() {
        return e(Block, { title: 'VCF' }, [
            e(Param, { title: 'Cutoff', key: 'cutoff' },
                e(KnobComponent, {
                    min: this.props.cutoff.min,
                    max: this.props.cutoff.max,
                    value: this.state.cutoff,
                    onChange: e => actions.setVcfCutoff(e.value)
                })
            )
        ]);
    }
}

Vcf.defaultProps = {
    cutoff: {
        min: 20,
        max: 20000
    }
};
