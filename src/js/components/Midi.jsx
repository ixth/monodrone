import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { subscribeToAllMidiMessages } from 'lib/omni';
import MIDIMessage from 'lib/midi-message';

import { setDelayTime, setDelayFeedback } from 'reducers/delay';
import { setLfoFrequency, setLfoIntensity } from 'reducers/lfo';
import { setOscGain, setOscFrequency } from 'reducers/osc';
import { setVcfCutoff } from 'reducers/vcf';
import { setVolume } from 'reducers/volume';

const frequencyFromNote = (tone) => 440 * 2 ** ((tone - 69) / 12);

const Midi = () => {
    const dispatch = useDispatch();

    const handleMidiMessage = useCallback(
        ({ data, type }) => {
            switch (type) {
                case MIDIMessage.NOTE_ON:
                    if (data[1] === 0) {
                        dispatch(setOscGain(0));
                    } else {
                        dispatch(setOscFrequency(frequencyFromNote(data[0])));
                        dispatch(setOscGain(data[1] / 0x7f));
                    }
                    break;

                case MIDIMessage.NOTE_OFF:
                    dispatch(setOscGain(0));
                    break;

                case MIDIMessage.CONTROL_CHANGE:
                    if (data[0] === MIDIMessage.CONTROL_VOLUME) {
                        dispatch(setVolume(data[1] / 0x7f));
                    }

                    if (data[0] === 0x4a) {
                        dispatch(setLfoFrequency(data[1] / 0x7f));
                    }

                    if (data[0] === 0x47) {
                        dispatch(setLfoIntensity(data[1] / 0x7f));
                    }

                    if (data[0] === 0x5b) {
                        dispatch(setDelayTime(data[1] / 0x7f));
                    }

                    if (data[0] === 0x5d) {
                        dispatch(setDelayFeedback(data[1] / 0x7f));
                    }

                    if (data[0] === 0x54) {
                        dispatch(setVcfCutoff(data[1] / 0x7f));
                    }
                    break;

                default:
                    break;
            }
        },
        [dispatch]
    );

    useEffect(() => {
        subscribeToAllMidiMessages(handleMidiMessage);
    }, [handleMidiMessage]);

    return null;
};

export default Midi;
