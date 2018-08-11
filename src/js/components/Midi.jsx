import { Component } from 'react';
import { connect } from 'react-redux';

import { subscribeToAllMidiMessages } from '../lib/omni';
import MIDIMessage from '../lib/midi-message';

import { setDelayTime, setDelayFeedback } from '../reducers/delay';
import { setLfoFrequency, setLfoIntensity } from '../reducers/lfo';
import { setOscGain, setOscFrequency } from '../reducers/osc';
import { setVcfCutoff } from '../reducers/vcf';

const frequencyFromNote = (tone) => 440 * Math.pow(2, (tone - 69) / 12);

class Midi extends Component {
    render() {
        return null;
    }

    componentDidMount() {
        subscribeToAllMidiMessages(this._onMidiMessage.bind(this));
    }

    _onMidiMessage(message) {
        const {
            setDelayTime,
            setDelayFeedback,
            setLfoFrequency,
            setLfoIntensity,
            setOscGain,
            setOscFrequency,
            setVcfCutoff,
        } = this.props;

        switch (message.type) {
            case MIDIMessage.NOTE_ON:
                if (message.data[1] === 0) {
                    setOscGain(0);
                } else {
                    setOscFrequency(frequencyFromNote(message.data[0]));
                    setOscGain(message.data[1] / 0x7f);
                }
                break;

            case MIDIMessage.NOTE_OFF:
                setOscGain(0);
                break;

            case MIDIMessage.CONTROL_CHANGE:
                if (message.data[0] === MIDIMessage.CONTROL_VOLUME) {
                    setVolume(message.data[1] / 0x7f);
                }
                if (message.data[0] === 0x4a) {
                    setLfoFrequency(message.data[1] / 0x7f);
                }
                if (message.data[0] === 0x47) {
                    setLfoIntensity(message.data[1] / 0x7f);
                }
                if (message.data[0] === 0x5b) {
                    setDelayTime(message.data[1] / 0x7f);
                }
                if (message.data[0] === 0x5d) {
                    setDelayFeedback(message.data[1] / 0x7f);
                }
                if (message.data[0] === 0x54) {
                    setVcfCutoff(message.data[1] / 0x7f);
                }
                break;
        }
    }
}

export default connect(null, {
    setDelayTime,
    setDelayFeedback,
    setLfoFrequency,
    setLfoIntensity,
    setOscGain,
    setOscFrequency,
    setVcfCutoff,
})(Midi);
