export function emitter(object) {
    const listeners = {};
    const ORIGINAL = 'original';

    return { on, off, emit, ...object };

    function bind(fn, context) {
        const _fn = fn.bind(context);
        _fn[ORIGINAL] = fn;
        return _fn;
    }

    function on(name, callback, context) {
        if (!listeners[name]) {
            listeners[name] = [];
        }
        if (listeners[name].indexOf(callback) > -1) {
            return;
        }
        if (context) {
            callback = bind(callback, context);
        }
        listeners[name].push(callback);
    }

    function off(name, callback) {
        if (!callback) {
            listeners[name] = [];
            return;
        }
        if (callback[ORIGINAL]) {
            callback = callback[ORIGINAL];
        }
        listeners.splice(listeners.indexOf(callback), 1);
    }

    function emit(name, payload) {
        if (listeners[name]) {
            listeners[name].forEach(listener => {
                listener(payload);
            });
        }
    }
}
