import { FC, memo, useCallback } from 'react';
import noop from 'lodash.noop';

import DraggableAngle from 'components/DraggableAngle';

import './styles/knob.css';

const dragStart = (): void => {
    document.body.style.cursor = '-webkit-grabbing';
};

const dragEnd = (): void => {
    document.body.style.cursor = '';
};

export type PropTypes = {
    value?: number;
    spread?: number;
    onChange?: (e: { value: number }) => void;
};

const Knob: FC<PropTypes> = memo(({ value = 0, spread = 280 / 360, onChange = noop }) => {
    const handleChange = useCallback(
        (_, data) => {
            onChange({
                value: Math.clamp(value + data.deltaAngle / (spread * 2 * Math.PI), 0, 1),
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
                onStart={dragStart}
                onStop={dragEnd}
                onDrag={handleChange}
                enableUserSelectHack
            >
                <span className="knob__handle" style={style} />
            </DraggableAngle>
        </span>
    );
});

export default Knob;
