import { FC, memo, useCallback } from 'react';
import {
    DraggableCore,
    DraggableCoreProps,
    DraggableEvent,
    DraggableEventHandler,
} from 'react-draggable';

import { augmentDraggableData, AugmentedDraggableData } from './utils';

export type DraggableAngleEventHandler = (
    e: DraggableEvent,
    data: AugmentedDraggableData
) => void | false;

export type PropTypes = Omit<Partial<DraggableCoreProps>, 'onStart' | 'onDrag' | 'onStop'> & {
    onDrag?: DraggableAngleEventHandler;
    onStart?: DraggableAngleEventHandler;
    onStop?: DraggableAngleEventHandler;
};

const DraggableAngle: FC<PropTypes> = memo(({ onDrag, onStart, onStop, ...props }) => {
    const handleDrag = useCallback<DraggableEventHandler>(
        (e, data) => {
            onDrag?.(e, augmentDraggableData(data));
        },
        [onDrag]
    );
    const handleStart = useCallback<DraggableEventHandler>(
        (e, data) => {
            onStart?.(e, augmentDraggableData(data));
        },
        [onStart]
    );
    const handleStop = useCallback<DraggableEventHandler>(
        (e, data) => {
            onStop?.(e, augmentDraggableData(data));
        },
        [onStop]
    );

    return (
        <DraggableCore {...props} onDrag={handleDrag} onStart={handleStart} onStop={handleStop} />
    );
});

export default DraggableAngle;
