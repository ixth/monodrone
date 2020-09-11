import React, { memo, useCallback } from 'react';
import { noop, clamp } from 'lib/utils';
import DraggableAngle from 'components/DraggableAngle';

const dragStart = () => {
    document.body.style.cursor = '-webkit-grabbing';
};

const dragEnd = () => {
    document.body.style.cursor = '';
};

const Knob = memo(({ value = 0, spread = 280 / 360, onChange = noop }) => {
    const handleChange = useCallback(
        (e, data) => {
            onChange({
                value: clamp(0, 1, value + data.deltaAngle / (spread * 2 * Math.PI)),
            });
        },
        [ value, spread ]
    );

    const style = {
        transform: `rotate(${((1 - spread) / 2)}turn) rotate(${value * spread}turn)`,
    };

    return (
        <span className="knob">
            <DraggableAngle enableUserSelectHack={true} onStart={dragStart} onStop={dragEnd} onDrag={handleChange}>
                <span className="knob__handle" style={style} />
            </DraggableAngle>
        </span>
    );
});

export default Knob;
