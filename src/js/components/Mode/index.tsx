import { useCallback, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { turnOn, turnOff } from 'reducers/power';
import { setLfoShape } from 'reducers/lfo';
import Position from './position';
import { RootState } from 'rootReducer';

const Mode: VFC = () => {
    const dispatch = useDispatch();

    const handleOff = useCallback(() => {
        dispatch(turnOff());
    }, [dispatch]);

    const handleSaw = useCallback(() => {
        dispatch(turnOn());
        dispatch(setLfoShape('sawtooth'));
    }, [dispatch]);

    const handleSquare = useCallback(() => {
        dispatch(turnOn());
        dispatch(setLfoShape('square'));
    }, [dispatch]);

    const value = useSelector((state: RootState) => (state.power ? state.lfo.shape : 'standby'));

    return (
        <fieldset className="switch">
            <Position
                name="mode"
                label="Standby"
                value="standby"
                checked={value === 'standby'}
                onChange={handleOff}
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
