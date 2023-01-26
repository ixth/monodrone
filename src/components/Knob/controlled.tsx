import React, { FC, memo, useCallback, useRef } from 'react';
import useEventListener from '@use-it/event-listener';
import { clamp } from 'utils';

import './styles/knob.css';

export interface PropTypes {
    value?: number;
    spread?: number;
    onChange?: (e: { value: number }) => void;
}

const Knob: FC<PropTypes> = memo(({ value = 0, spread = 280 / 360, onChange }) => {
    const prevEventRef = useRef<MouseEvent>();
    const prevValueRef = useRef<number>(value);

    const onMouseDown = useCallback<React.MouseEventHandler>(
        (e) => {
            document.body.style.setProperty('cursor', '-webkit-grabbing');
            prevEventRef.current = e.nativeEvent;
            prevValueRef.current = value;
        },
        [value]
    );

    const onMouseUp = useCallback(() => {
        document.body.style.removeProperty('cursor');
        prevEventRef.current = undefined;
        prevValueRef.current = value;
    }, [value]);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (prevEventRef.current !== undefined) {
                onChange?.({
                    value: clamp(
                        prevValueRef.current + (e.pageY - prevEventRef.current.pageY) / 360,
                        0,
                        1
                    ),
                });
            }
        },
        [onChange]
    );

    useEventListener('mouseup', onMouseUp, window);
    useEventListener('mousemove', onMouseMove, window);

    const angle = (1 - spread) / 2 + value * spread;

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="knob" onMouseDown={onMouseDown}>
            <svg viewBox="-50 -50 100 100" className="knob__handle">
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
                    mask="url(#mask)"
                    transform={`rotate(${360 * angle})`}
                />
            </svg>
        </div>
    );
});

export default Knob;
