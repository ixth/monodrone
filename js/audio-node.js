(function() {
    'use strict';

    if (typeof AudioNode !== 'undefined') {
        AudioNode.prototype.connect = new Proxy(AudioNode.prototype.connect, {
            apply: function (target, thisArg, [destination, ...rest]) {
                if (destination && typeof destination.__connectFrom === 'function') {
                    return destination.__connectFrom(thisArg, ...rest);
                }
                return target.call(thisArg, destination, ...rest);
            }
        });

        AudioNode.prototype.disconnect = new Proxy(AudioNode.prototype.disconnect, {
            apply: function (target, thisArg, [destination, ...rest]) {
                if (destination && typeof destination.__disconnectFrom === 'function') {
                    return destination.__disconnectFrom(thisArg, ...rest);
                }
                return target.call(thisArg, destination, ...rest);
            }
        });
    }
}());