import { InputHTMLAttributes, VFC } from 'react';
import noop from 'lodash.noop';

export type PropTypes = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'value' | 'checked' | 'onChange'
> & { label: string };

const Position: VFC<PropTypes> = ({ name, label, value, checked = false, onChange = noop }) => (
    <label className="switch__position">
        <input
            className="switch__input"
            type="radio"
            name={name}
            value={value}
            defaultChecked={checked}
            onChange={onChange}
        />
        <span className="switch__knob" />
        <span className="switch__label">{label}</span>
    </label>
);

export default Position;
