import { createElement as e } from 'react';

import { turnOff, setLfoShape } from '../../actions.js';

export function Mode(props) {
    return e('fieldset', { className: 'switch' }, [
        {
            label: 'Standby',
            value: 'standby',
            onChange: () => turnOff(),
        },
        {
            label: '⋀',
            value: 'sawtooth',
            onChange: () => setLfoShape('sawtooth'),
        },
        {
            label: '⎍',
            value: 'square',
            onChange: () => setLfoShape('square'),
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
