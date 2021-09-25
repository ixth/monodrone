export default () => {
    if (typeof AudioNode !== 'undefined') {
        const { connect } = AudioNode.prototype;
        AudioNode.prototype.connect = function audioNodeConnect(destination, ...rest) {
            if (destination && typeof destination.__connectFrom === 'function') {
                return destination.__connectFrom(this, ...rest);
            }
            return connect.call(this, destination, ...rest);
        };

        const { disconnect } = AudioNode.prototype;
        AudioNode.prototype.disconnect = function audioNodeDisconnect(destination, ...rest) {
            if (destination && typeof destination.__disconnectFrom === 'function') {
                return destination.__disconnectFrom(this, ...rest);
            }
            return disconnect.call(this, destination, ...rest);
        };
    }
};
