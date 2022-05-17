import type { DraggableData } from 'react-draggable';

export interface AngleData {
    angle: number;
    lastAngle: number;
    deltaAngle: number;
}

const modAngle = (angle: number): number => {
    const absoluteAngle = Math.abs(angle);
    return absoluteAngle > Math.PI ? 2 * Math.PI - absoluteAngle : angle;
};

export const getAngleData = ({ x, y, lastX, lastY }: DraggableData): AngleData => {
    const angle = Math.atan2(y, x);
    const lastAngle = Math.atan2(lastY, lastX);
    return {
        angle,
        lastAngle,
        deltaAngle: modAngle(angle - lastAngle),
    };
};

export type AugmentedDraggableData = DraggableData & AngleData;

export const augmentDraggableData = (data: DraggableData): AngleData & DraggableData => ({
    ...data,
    ...getAngleData(data),
});
