export class CustomAudioNode extends EventTarget implements AudioNode {
    channelCount = 0;

    channelCountMode: ChannelCountMode = 'max';

    channelInterpretation: ChannelInterpretation = 'speakers';

    readonly numberOfInputs = 0;

    readonly numberOfOutputs = 0;

    protected readonly _inputs: AudioNode[] = [];

    protected readonly _outputs: AudioNode[] = [];

    constructor(readonly context: BaseAudioContext) {
        super();
    }

    __connectFrom(sourceNode: AudioNode, output = 0, input = 0): AudioNode {
        sourceNode.connect(this._inputs[input], output);
        return this;
    }

    __disconnectFrom(sourceNode: AudioNode, output = 0, input = 0): void {
        sourceNode.disconnect(this._inputs[input], output);
    }

    connect(destinationNode: AudioNode, output?: number, input?: number): AudioNode;

    connect(destinationParam: AudioParam, output?: number): void;

    // eslint-disable-next-line consistent-return
    connect(destination: AudioNode | AudioParam, output = 0, input = 0): AudioNode | void {
        if (destination instanceof AudioNode) {
            return this._outputs[output].connect(destination, 0, input);
        }
        this._outputs[output].connect(destination);
    }

    disconnect(): void;

    disconnect(output: number): void;

    disconnect(destinationNode: AudioNode): void;

    disconnect(destinationNode: AudioNode, output: number): void;

    disconnect(destinationNode: AudioNode, output: number, input: number): void;

    disconnect(destinationParam: AudioParam): void;

    disconnect(destinationParam: AudioParam, output: number): void;

    // eslint-disable-next-line consistent-return
    disconnect(destination?: number | AudioNode | AudioParam, output = 0, input = 0): void {
        if (typeof destination === 'undefined') {
            this._outputs[output].disconnect();
        } else if (typeof destination === 'number') {
            this._outputs[output].disconnect(destination);
        } else if (destination instanceof AudioNode) {
            return this._outputs[output].disconnect(destination, 0, input);
        } else if (destination instanceof AudioParam) {
            return this._outputs[output].disconnect(destination, 0);
        } else {
            this._outputs[output].disconnect(destination, 0, input);
        }
    }
}

export interface PatchedAudioNode extends AudioNode {
    originalConnect: AudioNode['connect'];
    originalDisconnect: AudioNode['disconnect'];
}

export const patchAudioNode = (): void => {
    if (typeof AudioNode === 'undefined' || 'originalConnect' in AudioNode.prototype) {
        return;
    }

    Object.assign(AudioNode.prototype, {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        originalConnect: AudioNode.prototype.connect,

        connect: function audioNodeConnect(
            this: PatchedAudioNode,
            ...args: Parameters<AudioNode['connect']>
        ): AudioNode | void {
            const [destinationNode, ...rest] = args;
            return destinationNode instanceof CustomAudioNode
                ? destinationNode.__connectFrom(this, ...rest)
                : this.originalConnect(...args);
        },

        // eslint-disable-next-line @typescript-eslint/unbound-method
        originalDisconnect: AudioNode.prototype.disconnect,

        disconnect: function audioNodeDisconnect(
            this: PatchedAudioNode,
            ...args: Parameters<AudioNode['disconnect']>
        ): AudioNode | void {
            const [destinationNode, ...rest] = args;
            if (destinationNode instanceof CustomAudioNode) {
                destinationNode.__disconnectFrom(this, ...rest);
            } else {
                this.originalDisconnect(...args);
            }
        },
    });
};
