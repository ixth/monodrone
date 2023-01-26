import { useCallback, VFC } from 'react';

import Position from './position';

import './styles/switch.css';

export interface PropTypes<T> {
    value: T;
    onChange?: (value: T) => void;
}

type OscillatorMode = Extract<OscillatorType, 'sawtooth' | 'square'>;

const Mode: VFC<PropTypes<OscillatorMode | 'standby'>> = ({ value = 'standby', onChange }) => {
    const handleStandby = useCallback(() => {
        onChange?.('standby');
    }, [onChange]);

    const handleSaw = useCallback(() => {
        onChange?.('sawtooth');
    }, [onChange]);

    const handleSquare = useCallback(() => {
        onChange?.('square');
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
