import { useCallback, VFC } from 'react';
import noop from 'lodash.noop';

import Position from './position';

import './styles/switch.css';

type PropTypes<T> = {
    value: T;
    onChange: (value: T) => void;
};

const Mode: VFC<PropTypes<'standby' | 'sawtooth' | 'square'>> = ({
    value = 'standby',
    onChange = noop,
}) => {
    const handleStandby = useCallback(() => {
        onChange('standby');
    }, [onChange]);

    const handleSaw = useCallback(() => {
        onChange('sawtooth');
    }, [onChange]);

    const handleSquare = useCallback(() => {
        onChange('square');
    }, [onChange]);

    return (
        <fieldset className="switch">
            <Position
                name="mode"
                label="Standby"
                value="standby"
                checked={value === 'standby'}
                onChange={handleStandby}
            />
            <Position
                name="mode"
                label={'\u00a0⋀'}
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
