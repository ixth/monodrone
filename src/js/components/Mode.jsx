import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { turnOn, turnOff } from 'reducers/power';
import { setLfoShape } from 'reducers/lfo';

const Position = ({ name, label, value, checked, onChange }) => (
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

Position.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

Position.defaultProps = {
    checked: false,
};

const Mode = () => {
    const dispatch = useDispatch();

    const handleSaw = useCallback(() => {
        turnOn();
        dispatch(setLfoShape('sawtooth'));
    }, [dispatch]);

    const handleSquare = useCallback(() => {
        turnOn();
        dispatch(setLfoShape('square'));
    }, [dispatch]);

    const value = useSelector((state) => (state.power ? state.lfo.shape : 'standby'));

    return (
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
                onChange={handleSaw}
            />
            <Position
                name="mode"
                label="⎍"
                value="square"
                checked={value === 'square'}
                onChange={handleSquare}
            />
        </fieldset>
    );
};

export default Mode;
