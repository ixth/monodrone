type MIDIMessageChannel = number & { type: 'message-channel' };

export enum MIDIMessageType {
    // Status byte constants
    NOTE_OFF = 0x80,
    NOTE_ON = 0x90,
    CONTROL_CHANGE = 0xb0,
    PITCH_BEND = 0xe0,

    // Controller numbers for CONTROL_CHANGE message
    CONTROL_VOLUME = 0x07,
    CONTROL_STOP = 0x17,
    CONTROL_PLAY = 0x19,
}

/**
 * @classdesc MIDI message, according to spec
 *
 * https://www.midi.org/specifications/item/table-1-summary-of-midi-message
 *
 * @class MIDIMessage
 * @param {WebMidi.MIDIMessageEvent} e
 * @param {Uint8Array} e.data
 * @param {Uint8Array} e.timeStamp
 */
export class MIDIMessage {
    raw: Uint8Array;

    type: MIDIMessageType;

    channel: MIDIMessageChannel;

    data: Uint8Array;

    receivedTime: number;

    status: number;

    constructor(e: WebMidi.MIDIMessageEvent) {
        const { data } = e;

        this.raw = data;
        this.status = data[0];
        this.type = MIDIMessage.getType(data);
        this.channel = MIDIMessage.getChannel(data);
        this.data = data.slice(1);
        this.receivedTime = e.timeStamp;
    }

    protected static getType(data: Uint8Array): MIDIMessageType {
        // eslint-disable-next-line no-bitwise
        return data[0] & 0xf0;
    }

    protected static getChannel(data: Uint8Array): MIDIMessageChannel {
        // eslint-disable-next-line no-bitwise
        return (data[0] & 0x0f) as MIDIMessageChannel;
    }
}
