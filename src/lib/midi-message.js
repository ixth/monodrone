/**
 * @classdesc MIDI message, according to spec
 *
 * https://www.midi.org/specifications/item/table-1-summary-of-midi-message
 *
 * @class MIDIMessage
 * @param {MIDIMessageEvent} e
 * @param {Uint8Array} e.data
 * @param {Uint8Array} e.timeStamp
 */

class MIDIMessage {
    // Status byte constants
    static NOTE_OFF = 0x80;

    static NOTE_ON = 0x90;

    static CONTROL_CHANGE = 0xb0;

    static PITCH_BEND = 0xe0;

    // Controller numbers for CONTROL_CHANGE message
    static CONTROL_VOLUME = 0x07;

    static CONTROL_STOP = 0x17;

    static CONTROL_PLAY = 0x19;

    constructor({ data, timeStamp }) {
        this.raw = data;
        [this.status, this.data] = data;
        // eslint-disable-next-line no-bitwise
        this.type = data[0] & 0xf0;
        // eslint-disable-next-line no-bitwise
        this.channel = data[0] & 0x0f;
        this.timeStamp = timeStamp;
    }
}

export default MIDIMessage;
