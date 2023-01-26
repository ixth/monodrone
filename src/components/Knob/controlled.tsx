import React, { FC, memo, useCallback, useRef } from 'react';
import useEventListener from '@use-it/event-listener';
import { clamp } from '../../utils';

import './styles/knob.css';

export interface PropTypes {
    value?: number;
    spread?: number;
    step?: number;
    sliderSize?: number;
    onChange?: (e: { value: number }) => void;
}

const Knob: FC<PropTypes> = memo(
    ({ value = 0, spread = 280 / 360, step = 1 / 10, sliderSize = 200, onChange }) => {
        const prevEventRef = useRef<MouseEvent>();
        const prevValueRef = useRef<number>(value);

        const handleChange = useCallback(
            (valueDiff: number) => {
                const nextValue = clamp(prevValueRef.current + valueDiff, 0, 1);
                if (nextValue !== prevValueRef.current) {
                    prevValueRef.current = nextValue;
                    onChange?.({
                        value: prevValueRef.current,
                    });
                }
            },
            [onChange]
        );

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
                    handleChange((e.pageY - prevEventRef.current.pageY) / sliderSize);
                    prevEventRef.current = e;
                }
            },
            [handleChange, sliderSize]
        );

        const onInput = useCallback<React.KeyboardEventHandler>(
            (e) => {
                if (e.code === 'ArrowUp') {
                    handleChange(step);
                }

                if (e.code === 'ArrowDown') {
                    handleChange(-step);
                }
            },
            [handleChange, step]
        );

        useEventListener('mouseup', onMouseUp, window);
        useEventListener('mousemove', onMouseMove, window);

        const angle = (1 - spread) / 2 + value * spread;

        return (
            <div
                className="knob"
                role="slider"
                tabIndex={0}
                onKeyDown={onInput}
                onMouseDown={onMouseDown}
                aria-valuenow={value}
            >
                <svg viewBox="-50 -50 100 100" className="knob__handle">
                    <defs>
                        <radialGradient id="gradient" r="1" cx=".5" cy="0" fx=".5" fy="0">
                            <stop offset="0%" stopColor="#666" />
                            <stop offset="100%" stopColor="#fff" />
                        </radialGradient>

                        <g id="mask-image">
                            <circle r="45" fill="#222" stroke="url(#gradient)" strokeWidth="10" />
                            <circle
                                r="48"
                                fill="none"
                                stroke="#000"
                                strokeWidth="5"
                                strokeDasharray="3 10"
                            />
                            <path d="M0 50v-35" stroke="black" strokeWidth="12" />
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
                        strokeWidth="10"
                        mask="url(#mask)"
                        transform={`rotate(${360 * angle})`}
                    />
                </svg>
            </div>
        );
    }
);

export default Knob;
