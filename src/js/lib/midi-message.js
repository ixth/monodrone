/**
 * @classdesc MIDI message, according to spec
 *
 * https://www.midi.org/specifications/item/table-1-summary-of-midi-message
 *
 * @class MIDIMessage
 * @param {MIDIMessageEvent} e
 */

class MIDIMessage {
    constructor(e) {
        const data = e.data;

        Object.assign(this, {
            raw: data,
            status: data[0],
            type: MIDIMessage.getType(data),
            channel: MIDIMessage.getChannel(data),
            data: Array.from(data).slice(1), // wtf? зачем from?
            receivedTime: e.receivedTime
        });
    }

    static getType(data) {
        return data[0] & 0xf0;
    }

    static getChannel(data) {
        return data[0] & 0x0f;
    }
}

Object.assign(MIDIMessage, {
    // Status byte constants
    NOTE_OFF: 0x80,
    NOTE_ON: 0x90,
    CONTROL_CHANGE: 0xb0,
    PITCH_BEND: 0xe0,

    // Controller numbers for CONTROL_CHANGE message
    CONTROL_VOLUME: 0x7,
    CONTROL_STOP: 0x17,
    CONTROL_PLAY: 0x19
});

export default MIDIMessage;
