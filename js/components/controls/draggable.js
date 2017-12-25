import { emitter } from '../../lib/events.js';

const basis = [1, 0];

function getAngle(a, b) {
    const scalarProduct = (a[0] * b[0] + a[1] * b[1]);
    const length = Math.sqrt(a[0] * a[0] + a[1] * a[1]) * Math.sqrt(b[0] * b[0] + b[1] * b[1]);
    const angle = Math.acos(scalarProduct / length) / (2 * Math.PI);
    return b[1] < 0 ? -angle : angle;
}

export function draggable(element) {
    const getDelta = e => {
        const { clientX, clientY } = e;

        const deltaX = e.pageX - dragOrigin.x;
        const deltaY = e.pageY - dragOrigin.y;
        const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * Math.sign(deltaX);
        const angle = getAngle(basis, [deltaX, deltaY]);
        let angleDelta = angle - prevAngle;
        if (Math.abs(angleDelta) > .5) {
            angleDelta = 1 - Math.abs(angleDelta);
        }
        prevAngle = angle;

        return {
            angle,
            angleDelta,
            delta,
            deltaX,
            deltaY,
            clientX,
            clientY
        };
    };

    const addMouseHandler = () => {
        for (let [type, listener] of Object.entries(listeners)) {
            window.addEventListener(type, listener);
        }
    };

    const removeMouseHandler = () => {
        for (let [type, listener] of Object.entries(listeners)) {
            window.removeEventListener(type, listener);
        }
    };

    const listeners = {
        'mousemove': e => {
            _interface.emit('drag', getDelta(e));
        },
        'mouseup': () => {
            _interface.emit('dragEnd');
            removeMouseHandler();
        }
    };

    let dragOrigin;
    let prevAngle;
    const mousedownListener = e => {
        addMouseHandler();
        dragOrigin = {
            x: e.pageX,
            y: e.pageY
        };
        prevAngle = 0;
        _interface.emit('dragStart', getDelta(e));
    };

    const dispose = () => {
        element.removeEventListener('mousedown', mousedownListener);
    };

    const _interface = emitter({
        dispose
    });

    element.addEventListener('mousedown', mousedownListener);

    return _interface;
}
