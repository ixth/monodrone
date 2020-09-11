import { connect } from 'react-redux';

import { turnOn, turnOff } from 'reducers/power';
import { setLfoShape } from 'reducers/lfo';


const Position = ({ name, label, value, checked, onChange }) => (
    <label className="switch__position">
        <input
            className="switch__input"
            type="radio"
            name={name}
            value={value}
            defaultChecked={checked}
            onChange={onChange}
        />
        <span className="switch__knob"/>
        <span className="switch__label">
            {label}
        </span>
    </label>
);

const Mode = ({ value, turnOn, turnOff, setLfoShape }) => (
    <fieldset className="switch">
        <Position
            name="mode"
            label="Standby"
            key="standby"
            value="standby"
            checked={value === 'standby'}
            onChange={turnOff}
        />
        <Position
            name="mode"
            label=" ⋀"
            key="sawtooth"
            value="sawtooth"
            checked={value === 'sawtooth'}
            onChange={() => {
                turnOn();
                setLfoShape('sawtooth');
            }}
        />
        <Position
            name="mode"
            label="⎍"
            value="square"
            checked={value === 'square'}
            onChange={() => {
                turnOn();
                setLfoShape('square');
            }}
        />
    </fieldset>
);

export default connect((state) => ({
    ...state,
    value: state.power ? state.lfo.shape : 'standby',
}), {
    turnOn,
    turnOff,
    setLfoShape,
})(Mode);
