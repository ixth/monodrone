import React, { FC, memo, useCallback, useRef, useState } from 'react';
import useEventListener from '@use-it/event-listener';

import './styles/knob.css';

export interface PropTypes {
    value?: number;
    spread?: number;
    onChange?: (e: { value: number }) => void;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

const modAngle = (angle: number): number => {
    const absoluteAngle = Math.abs(angle);
    return absoluteAngle > Math.PI ? 2 * Math.PI - absoluteAngle : angle;
};

const getAngleDelta = (current: MouseEvent, prev?: MouseEvent) =>
    prev
        ? modAngle(
              Math.atan2(current.offsetY, current.offsetX) - Math.atan2(prev.offsetY, prev.offsetX)
          )
        : 0;

const Knob: FC<PropTypes> = memo(({ value = 0, spread = 280 / 360, onChange }) => {
    const prevEventRef = useRef<MouseEvent>();
    const [isDown, setIsDown] = useState(false);

    const onMousedown = useCallback<React.MouseEventHandler>((e) => {
        document.body.style.cursor = '-webkit-grabbing';
        prevEventRef.current = e.nativeEvent;
        setIsDown(true);
    }, []);

    const onMouseUp = useCallback(() => {
        document.body.style.cursor = '';
        prevEventRef.current = undefined;
        setIsDown(false);
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDown) {
                onChange?.({
                    value: clamp(
                        value + getAngleDelta(e, prevEventRef.current) / (spread * 2 * Math.PI),
                        0,
                        1
                    ),
                });
                prevEventRef.current = e;
            }
        },
        [isDown, onChange, spread, value]
    );

    useEventListener('mouseup', onMouseUp, window);
    useEventListener('mousemove', onMouseMove, window);

    const style = {
        transform: `rotate(${(1 - spread) / 2}turn) rotate(${value * spread}turn)`,
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className="knob" onMouseDown={onMousedown}>
            <span className="knob__handle" style={style} />
        </span>
    );
});

export default Knob;
