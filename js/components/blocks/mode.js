import { createElement as e } from '../../lib/React.js';

import { actions } from '../../actions.js';

export function Mode(props) {
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
    ].map(position => e(Position, {
        key: position.value,
        name: 'mode',
        checked: props.value === position.value,
        ...position
    })));
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
