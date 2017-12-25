import React from '../../lib/React.js';
const e = React.createElement;
const Component = React.Component;

import { store } from '../../store.js';
import { actions } from '../../actions.js';

export class Mode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this._getValue()
        };
    }

    componentDidMount() {
        store.on('change', () => {
            this.setState({
                value: this._getValue()
            });
        });
    }

    _getValue() {
        return store.standby ? 'standby' : store.lfo.shape;
    }

    render() {
        return e('fieldset', { className: 'switch' }, [
            {
                label: 'Standby',
                value: 'standby',
                onChange: () => actions.turnOff(),
            },
            {
                label: '⋀',
                value: 'sawtooth',
                onChange: () => actions.setLfoShape('sawtooth'),
            },
            {
                label: '⎍',
                value: 'square',
                onChange: () => actions.setLfoShape('square'),
            }
        ].map(props => e(Position, {
            key: props.value,
            name: 'mode',
            checked: this.state.value === props.value,
            ...props
        })));
    }
}

function Position({ name, label, value, checked, onChange }) {
    return e('label', { className: 'switch__position' },
        e('input', {
            className: 'switch__input',
            type: 'radio',
            name,
            value,
            defaultChecked: checked,
            onChange
        }),
        e('span', { className: 'switch__knob' }),
        label
    );
}
