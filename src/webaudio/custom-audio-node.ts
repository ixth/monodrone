// @ts-ignore

export abstract class CustomAudioNode implements AudioNode {
    constructor(protected context: BaseAudioContext) {}

    __connectFrom(sourceNode: AudioNode, output?: number, input?: number) {
        throw new Error('Not implemented');
    }

    __disconnectFrom(sourceNode: AudioNode, output?: number, input?: number) {
        throw new Error('Not implemented');
    }
}

export const patchAudioNode = () => {
    if (typeof AudioNode !== 'undefined') {
        Object.assign(AudioNode.prototype, {
            originalConnect: AudioNode.prototype.connect,

            connect: function audioNodeConnect(this: AudioNode, ...args: any[]) {
                const [destinationNode, ...rest] = args;
                if (destinationNode instanceof CustomAudioNode) {
                    return destinationNode.__connectFrom(this, ...rest);
                }
                return this.originalConnect(...args);
            },

            originalDisconnect: AudioNode.prototype.disconnect,

            disconnect: function audioNodeDisconnect(this: AudioNode, ...args: any[]) {
                const [destinationNode, ...rest] = args;
                if (destinationNode instanceof CustomAudioNode) {
                    return destinationNode.__disconnectFrom(this, ...rest);
                }
                return this.originalDisconnect(...args);
            },
        });
    }
};
