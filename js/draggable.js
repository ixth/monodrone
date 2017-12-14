function draggable(element) {
    let dragOrigin;
    const getDelta = e => {
        const deltaX = e.pageX - dragOrigin.x;
        const deltaY = e.pageY - dragOrigin.y;
        const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * Math.sign(deltaX);
        return {
            delta,
            deltaX,
            deltaY
        };
    };

    const addMouseHandler = _ => {
        for (let [type, listener] of Object.entries(listeners)) {
            window.addEventListener(type, listener);
        }
    };

    const removeMouseHandler = _ => {
        for (let [type, listener] of Object.entries(listeners)) {
            window.removeEventListener(type, listener);
        }
    };

    const listeners = {
        'mousemove': e => {
            element.dispatchEvent(new CustomEvent('drag', { detail: getDelta(e) }));
        },
        'mouseup': e => {
            element.dispatchEvent(new CustomEvent('dragEnd', { detail: getDelta(e) }));
            removeMouseHandler();
        }
    };

    element.addEventListener('mousedown', e => {
        addMouseHandler();
        dragOrigin = {
            x: e.pageX,
            y: e.pageY
        };
        element.dispatchEvent(new Event('dragStart'));
    });

    return element;
}
