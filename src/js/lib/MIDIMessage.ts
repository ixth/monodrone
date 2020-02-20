import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

type MIDIMessageChannel = number;

enum MIDIMessageType {
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

export class MIDIMessage {
    private raw: Uint8Array;
    private type: MIDIMessageType;
    private channel: MIDIMessageChannel;
    private data: Uint8Array;
    private receivedTime: number;
    status: number;

    constructor(e: MIDIMessageEvent) {
        const data = e.data;

        this.raw = data;
        this.status = data[0];
        this.type = MIDIMessage.getType(data);
        this.channel = MIDIMessage.getChannel(data);
        this.data = data.slice(1);
        this.receivedTime = e.timeStamp;
    }

    static getType(data: Uint8Array): MIDIMessageType {
        return data[0] & 0xf0;
    }

    static getChannel(data: Uint8Array): MIDIMessageChannel {
        return data[0] & 0x0f;
    }
}
