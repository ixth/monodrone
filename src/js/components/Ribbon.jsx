import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setOscGain, setOscFrequency } from 'reducers/osc';
import { clamp } from 'lib/utils';

import { DraggableCore } from 'react-draggable';

const getFrequency = (ratio) => 23 * Math.pow(1.886525, 8 * clamp(0, 1, ratio));

const Ribbon = () => {
    const dispatch = useDispatch();

    const handleStart = useCallback(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(x / node.offsetWidth)));
            dispatch(setOscGain(1));
        }, []
    );

    const handleStop = useCallback(
        () => {
            dispatch(setOscGain(0));
        }, []
    );

    const handleDrag = useCallback(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(x / node.offsetWidth)));
        }, []
    );

    return (
        <div className="keyboard">
            <DraggableCore
                enableUserSelectHack={true}
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <div className="keyboard__keys">
                    <span className="key"/>
                    <span className="key key_black"/>
                    <span className="key key_narrow"/>
                    <span className="key key_narrow"/>
                    <span className="key key_black"/>
                    <span className="key"/>
                    <span className="key key_black"/>
                    <span className="key key_narrow"/>
                    <span className="key key_narrow"/>
                    <span className="key key_black"/>
                    <span className="key"/>
                    <span className="key key_black"/>
                    <span className="key"/>
                    <span className="key key_black"/>
                    <span className="key key_narrow"/>
                    <span className="key key_narrow"/>
                    <span className="key key_black"/>
                    <span className="key"/>
                </div>
            </DraggableCore>
        </div>
    );
};

export default Ribbon;
