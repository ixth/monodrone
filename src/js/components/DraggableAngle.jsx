import { memo, useCallback } from 'react';
import { DraggableCore } from 'react-draggable';
import { getAngle } from 'lib/vectors';

const getAngleData = ({ x, y, lastX, lastY }) => {
    const angle = getAngle([x, y]);
    const lastAngle = getAngle([lastX, lastY]);
    const deltaAngle = angle - lastAngle;
    const absoluteDelta = Math.abs(deltaAngle);
    return {
        angle,
        lastAngle,
        deltaAngle: absoluteDelta > Math.PI ? 2 * Math.PI - absoluteDelta : deltaAngle,
    };
};

const augmentDraggableData = (data) => ({ ...data, ...getAngleData(data) });

const DraggableAngle = memo(({ onDrag, onStart, onStop, ...props }) => {
    const handleDrag = useCallback((e, data) => onDrag(e, augmentDraggableData(data)), [onDrag]);
    const handleStart = useCallback((e, data) => onStart(e, augmentDraggableData(data)), [onStart]);
    const handleStop = useCallback((e, data) => onStop(e, augmentDraggableData(data)), [onStop]);

    return <DraggableCore {...props} onDrag={handleDrag} onStart={handleStart} onStop={handleStop} />;
});

export default DraggableAngle;
