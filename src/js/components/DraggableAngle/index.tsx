import React, { FC, memo, useCallback } from 'react';
import { DraggableCore, DraggableCoreProps } from 'react-draggable';

import { augmentDraggableData } from './utils';

const noop = () => { };

export type PropTypes = Partial<DraggableCoreProps>;

const DraggableAngle: FC<PropTypes> =
    memo(
        ({ onDrag = noop, onStart = noop, onStop = noop, ...props }) => {
            const handleDrag = useCallback((e, data) => onDrag(e, augmentDraggableData(data)), [onDrag]);
            const handleStart = useCallback((e, data) => onStart(e, augmentDraggableData(data)), [onStart]);
            const handleStop = useCallback((e, data) => onStop(e, augmentDraggableData(data)), [onStop]);

            return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <DraggableCore {...props} onDrag={handleDrag} onStart={handleStart} onStop={handleStop} />
            );
        }
    );

export default DraggableAngle;
