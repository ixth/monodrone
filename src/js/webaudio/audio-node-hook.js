export default () => {
    if (typeof AudioNode !== 'undefined') {
        const connect = AudioNode.prototype.connect;
        AudioNode.prototype.connect = function (destination, ...rest) {
            if (destination && typeof destination.__connectFrom === 'function') {
                return destination.__connectFrom(this, ...rest);
            }
            return connect.call(this, destination, ...rest);
        };

        const disconnect = AudioNode.prototype.disconnect;
        AudioNode.prototype.disconnect = function (destination, ...rest) {
            if (destination && typeof destination.__disconnectFrom === 'function') {
                return destination.__disconnectFrom(this, ...rest);
            }
            return disconnect.call(this, destination, ...rest);
        };
    }
};
