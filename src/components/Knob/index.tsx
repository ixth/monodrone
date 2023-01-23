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

    return (
        <svg viewBox="-50 -50 100 100" className="knob" onMouseDown={onMousedown}>
            <defs>
                <radialGradient id="gradient" r="1" cx=".5" cy="0" fx=".5" fy="0">
                    <stop offset="0%" stop-color="#666" />
                    <stop offset="100%" stop-color="#fff" />
                </radialGradient>

                <g id="mask-image">
                    <circle r="45" fill="#222" stroke="url(#gradient)" stroke-width="10" />
                    <circle
                        r="48"
                        fill="none"
                        stroke="#000"
                        stroke-width="5"
                        stroke-dasharray="3 10"
                    />
                    <path d="M0 50v-35" stroke="black" stroke-width="12" />
                </g>

                <mask
                    id="mask"
                    maskUnits="userSpaceOnUse"
                    x="-50%"
                    y="-50%"
                    width="100%"
                    height="100%"
                >
                    <use href="#mask-image" />
                </mask>
            </defs>

            <circle
                r="50"
                fill="rgba(127,127,127,.5)"
                stroke-width="10"
                transform={`rotate(${360 * ((1 - spread) / 2 + value * spread)})`}
                mask="url(#mask)"
            />
        </svg>
    );
});

export default Knob;
