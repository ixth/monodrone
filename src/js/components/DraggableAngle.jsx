import { DraggableCore } from 'react-draggable';
import { getAngle } from '../lib/vectors';

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

const DraggableAngle = (props) => (
    <DraggableCore
        {...props}
        onStart={(e, data) => props.onStart(e, augmentDraggableData(data))}
        onDrag={(e, data) => props.onDrag(e, augmentDraggableData(data))}
        onStop={(e, data) => props.onStop(e, augmentDraggableData(data))}
    />
);

export default DraggableAngle;
