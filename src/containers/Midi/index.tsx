import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MIDIMessageType } from '@ixth/midi-utils/MIDIMessage';
import { MIDIMessageHandler, subscribeToAllMidiMessages } from '@ixth/midi-utils/omni';
import { setDelayFeedback, setDelayTime } from 'reducers/delay';
import { setLfoFrequency, setLfoIntensity } from 'reducers/lfo';
import { setOscFrequency, setOscGain } from 'reducers/osc';
import { setVcfCutoff } from 'reducers/vcf';
import { setVolume } from 'reducers/volume';

import { frequencyFromNote } from './utils';

const MidiContainer: VFC = memo(() => {
    const dispatch = useDispatch();

    const handleMidiMessage = useCallback<MIDIMessageHandler>(
        ({ data, type }) => {
            switch (type) {
                case MIDIMessageType.NOTE_ON:
                    if (data[1] === 0) {
                        dispatch(setOscGain(0));
                    } else {
                        dispatch(setOscFrequency(frequencyFromNote(data[0])));
                        dispatch(setOscGain(data[1] / 0x7f));
                    }
                    break;

                case MIDIMessageType.NOTE_OFF:
                    dispatch(setOscGain(0));
                    break;

                case MIDIMessageType.CONTROL_CHANGE:
                    if (data[0] === MIDIMessageType.CONTROL_VOLUME) {
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
        subscribeToAllMidiMessages(handleMidiMessage).catch((e) => {
            console.error(e);
        });
    }, [handleMidiMessage]);

    return null;
});

export default MidiContainer;
