/* eslint-disable */
export abstract class CustomAudioNode {
    protected constructor(protected context: BaseAudioContext) {}

    abstract __connectFrom(sourceNode: AudioNode, output?: number, input?: number): AudioNode;

    abstract __disconnectFrom(sourceNode: AudioNode, output?: number, input?: number): void;
}

export interface PatchedAudioNode extends AudioNode {
    originalConnect: AudioNode['connect'];
    originalDisconnect: AudioNode['disconnect'];
}

export const patchAudioNode = (): void => {
    if (typeof AudioNode !== 'undefined') {
        Object.assign(AudioNode.prototype, {
            originalConnect: AudioNode.prototype.connect,

            connect: function audioNodeConnect(
                this: PatchedAudioNode,
                ...args: Parameters<AudioNode['connect']>
            ): AudioNode | void {
                const [destinationNode, ...rest] = args;
                if (destinationNode instanceof CustomAudioNode) {
                    return destinationNode.__connectFrom(this, ...rest);
                }
                this.originalConnect(...args);
            },

            originalDisconnect: AudioNode.prototype.disconnect,

            disconnect: function audioNodeDisconnect(
                this: PatchedAudioNode,
                ...args: Parameters<AudioNode['disconnect']>
            ): AudioNode | void {
                const [destinationNode, ...rest] = args;
                if (destinationNode instanceof CustomAudioNode) {
                    destinationNode.__disconnectFrom(this, ...rest);
                    return;
                }
                this.originalDisconnect(...args);
            },
        });
    }
};
