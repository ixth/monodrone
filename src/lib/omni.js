import MIDIMessage from 'lib/midi-message';

let sharedMidiAccess;
export const getSharedMidiAccess = async () => {
    if (!sharedMidiAccess) {
        if (!navigator.requestMIDIAccess) {
            throw new Error();
        }
        sharedMidiAccess = navigator.requestMIDIAccess();
    }
    return sharedMidiAccess;
};

export const subscribeToAllMidiMessages = async (onMessage) => {
    const { inputs } = await getSharedMidiAccess();
    inputs.forEach((port) => {
        // eslint-disable-next-line no-param-reassign
        port.onmidimessage = (e) => {
            onMessage(new MIDIMessage(e));
        };
    });
};
