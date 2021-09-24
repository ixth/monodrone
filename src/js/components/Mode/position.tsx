import { InputHTMLAttributes, VFC } from 'react';

const noop = () => { };

export type PropTypes =
    Pick<
        InputHTMLAttributes<HTMLInputElement>,
        'name' | 'value' | 'checked' | 'onChange'
    > &
    { label: string };

const Position: VFC<PropTypes> = ({ name, label, value, checked = false, onChange = noop }) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
