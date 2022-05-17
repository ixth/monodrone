import type { InputHTMLAttributes, VFC } from 'react';

export type PropTypes = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'name' | 'onChange' | 'value'
> & {
    label: string;
};

const Position: VFC<PropTypes> = ({ name, label, value, checked = false, onChange }) => (
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
