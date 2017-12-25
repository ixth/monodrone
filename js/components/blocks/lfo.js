import React from '../../lib/React.js';

import { store } from '../../store.js';
import { actions } from '../../actions.js';

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

const e = React.createElement;
const Component = React.Component;

export class Lfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: store.lfo.frequency,
            intensity: store.lfo.intensity
        };
    }

    componentDidMount() {
        store.on('change', () => {
            this.setState({
                frequency: store.lfo.frequency,
                intensity: store.lfo.intensity
            });
        });
    }

    render() {
        return e(Block, { title: 'LFO' }, [
            e(Param, { title: 'Rate', led: true, key: 'rate' },
                e(KnobComponent, {
                    min: this.props.frequency.min,
                    max: this.props.frequency.max,
                    value: this.state.frequency,
                    onChange: e => actions.setLfoFrequency(e.value)
                })
            ),
            e(Param, { title: 'Int', key: 'int' },
                e(KnobComponent, {
                    min: this.props.intensity.min,
                    max: this.props.intensity.max,
                    value: this.state.intensity,
                    onChange: e => actions.setLfoIntensity(e.value)
                })
            )
        ]);
    }
}

Lfo.defaultProps = {
    frequency: {
        min: 1,
        max: 50
    },
    intensity: {
        min: 0,
        max: 10
    }
};
