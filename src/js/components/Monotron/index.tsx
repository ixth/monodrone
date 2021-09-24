import { useCallback, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Audio from 'components/Audio';
import Midi from 'components/Midi';
import Block from 'components/Block';
import Mode from 'components/Mode';
import Ribbon from 'components/Ribbon';

import Param from 'components/Param';
import Knob from 'components/Knob';

import { setLfoFrequency, setLfoIntensity } from 'reducers/lfo';
import { setVcfCutoff } from 'reducers/vcf';
import { setDelayFeedback, setDelayTime } from 'reducers/delay';
import { RootState } from 'rootReducer';

const Monotron: VFC = () => {
    const dispatch = useDispatch();

    const frequency = useSelector(({ lfo }: RootState) => lfo.frequency);
    const intensity = useSelector(({ lfo }: RootState) => lfo.intensity);
    const cutoff = useSelector(({ vcf }: RootState) => vcf.cutoff);
    const delayTime = useSelector(({ delay }: RootState) => delay.time);
    const feedback = useSelector(({ delay }: RootState) => delay.feedback);

    const handleFrequencyChange = useCallback(
        ({ value }) => {
            dispatch(setLfoFrequency(value));
        },
        [dispatch]
    );
    const handleIntensityChange = useCallback(
        ({ value }) => {
            dispatch(setLfoIntensity(value));
        },
        [dispatch]
    );
    const handleCutoffChange = useCallback(
        ({ value }) => {
            dispatch(setVcfCutoff(value));
        },
        [dispatch]
    );
    const handleDelayTimeChange = useCallback(
        ({ value }) => {
            dispatch(setDelayTime(value));
        },
        [dispatch]
    );
    const handleFeedbackChange = useCallback(
        ({ value }) => {
            dispatch(setDelayFeedback(value));
        },
        [dispatch]
    );

    return (
        <div className="device">
            <div className="device__blocks">
                <Audio />
                <Midi />
                <Mode />
                <Block title="LFO">
                    <Param title="Rate" led>
                        <Knob value={frequency} onChange={handleFrequencyChange} />
                    </Param>
                    <Param title="Int">
                        <Knob value={intensity} onChange={handleIntensityChange} />
                    </Param>
                </Block>
                <Block title="VCF">
                    <Param title="Cutoff">
                        <Knob value={cutoff} onChange={handleCutoffChange} />
                    </Param>
                </Block>
                <Block title="Delay">
                    <Param title="Time">
                        <Knob value={delayTime} onChange={handleDelayTimeChange} />
                    </Param>
                    <Param title="Feedback">
                        <Knob value={feedback} onChange={handleFeedbackChange} />
                    </Param>
                </Block>
            </div>
            <div className="device__keyboard">
                <div className="device__keyboard-content">
                    <Ribbon />
                </div>
            </div>
        </div>
    );
};

export default Monotron;
