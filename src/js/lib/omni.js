import MIDIMessage from './midi-message';

export const subscribeToAllMidiMessages = (onMessage) =>
    getSharedMidiAccess().then((access) => {
        access.inputs.forEach((port) => {
            port.onmidimessage = (e) => {
                onMessage(new MIDIMessage(e));
            };
        });
    });

let sharedMidiAccess;
export const getSharedMidiAccess = () =>
    sharedMidiAccess || (sharedMidiAccess = navigator.requestMIDIAccess());
