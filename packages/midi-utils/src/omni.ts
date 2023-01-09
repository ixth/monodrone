import { MIDIMessage } from './MIDIMessage';

let sharedMidiAccess: Promise<WebMidi.MIDIAccess> | undefined;
export const getSharedMidiAccess = async (): Promise<WebMidi.MIDIAccess> => {
    if (sharedMidiAccess === undefined) {
        if (!navigator.requestMIDIAccess) {
            throw new Error();
        }
        sharedMidiAccess = navigator.requestMIDIAccess();
    }
    return sharedMidiAccess;
};

export type MIDIMessageHandler = (e: MIDIMessage) => void;

export const subscribeToAllMidiMessages = async (onMessage: MIDIMessageHandler): Promise<void> => {
    const { inputs } = await getSharedMidiAccess();
    inputs.forEach((port) => {
        // eslint-disable-next-line no-param-reassign
        port.onmidimessage = (e) => {
            onMessage(new MIDIMessage(e));
        };
    });
};
