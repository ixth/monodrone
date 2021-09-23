import React, { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { DraggableCore } from 'react-draggable';

import { setOscGain, setOscFrequency } from 'reducers/osc';

import { getFrequency } from './utils';

const Ribbon: VFC = () => {
    const dispatch = useDispatch();

    const handleStart = useCallback(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(Math.clamp(x / node.offsetWidth, 0, 1))));
            dispatch(setOscGain(1));
        },
        [dispatch]
    );

    const handleStop = useCallback(() => {
        dispatch(setOscGain(0));
    }, [dispatch]);

    const handleDrag = useCallback(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(x / node.offsetWidth)));
        },
        [dispatch]
    );

    return (
        <div className="keyboard">
            <DraggableCore
                enableUserSelectHack
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <div className="keyboard__keys">
                    <span className="key" />
                    <span className="key key_black" />
                    <span className="key key_narrow" />
                    <span className="key key_narrow" />
                    <span className="key key_black" />
                    <span className="key" />
                    <span className="key key_black" />
                    <span className="key key_narrow" />
                    <span className="key key_narrow" />
                    <span className="key key_black" />
                    <span className="key" />
                    <span className="key key_black" />
                    <span className="key" />
                    <span className="key key_black" />
                    <span className="key key_narrow" />
                    <span className="key key_narrow" />
                    <span className="key key_black" />
                    <span className="key" />
                </div>
            </DraggableCore>
        </div>
    );
};

export default Ribbon;
