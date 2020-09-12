import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop, clamp } from 'lib/utils';
import DraggableAngle from 'components/DraggableAngle';

const dragStart = () => {
    document.body.style.cursor = '-webkit-grabbing';
};

const dragEnd = () => {
    document.body.style.cursor = '';
};

const Knob = ({ value = 0, spread = 280 / 360, onChange = noop }) => {
    const handleChange = useCallback(
        (e, data) => {
            onChange({
                value: clamp(0, 1, value + data.deltaAngle / (spread * 2 * Math.PI)),
            });
        },
        [onChange, value, spread]
    );

    const style = {
        transform: `rotate(${(1 - spread) / 2}turn) rotate(${value * spread}turn)`,
    };

    return (
        <span className="knob">
            <DraggableAngle
                enableUserSelectHack
                onStart={dragStart}
                onStop={dragEnd}
                onDrag={handleChange}
            >
                <span className="knob__handle" style={style} />
            </DraggableAngle>
        </span>
    );
};

Knob.propTypes = {
    value: PropTypes.number.isRequired,
    spread: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default memo(Knob);
