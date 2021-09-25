import { FC, memo, useCallback } from 'react';
import { DraggableCore, DraggableCoreProps } from 'react-draggable';
import noop from 'lodash.noop';

import { augmentDraggableData } from './utils';

export type PropTypes = Partial<DraggableCoreProps>;

const DraggableAngle: FC<PropTypes> = memo(
    ({ onDrag = noop, onStart = noop, onStop = noop, ...props }) => {
        const handleDrag = useCallback(
            (e, data) => onDrag(e, augmentDraggableData(data)),
            [onDrag]
        );
        const handleStart = useCallback(
            (e, data) => onStart(e, augmentDraggableData(data)),
            [onStart]
        );
        const handleStop = useCallback(
            (e, data) => onStop(e, augmentDraggableData(data)),
            [onStop]
        );

        return (
            <DraggableCore
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                onDrag={handleDrag}
                onStart={handleStart}
                onStop={handleStop}
            />
        );
    }
);

export default DraggableAngle;
