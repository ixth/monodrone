import { useCallback, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'rootReducer';

import Monotron from 'components/Monotron';
import { setDelayFeedback, setDelayTime } from 'reducers/delay';
import { setLfoFrequency, setLfoIntensity, setLfoShape } from 'reducers/lfo';
import { turnOff, turnOn } from 'reducers/power';
import { setVcfCutoff } from 'reducers/vcf';

const MonotronContainer: VFC = () => {
    const dispatch = useDispatch();

    const mode = useSelector(({ power, lfo }: RootState) => (power ? lfo.shape : 'standby'));
    const frequency = useSelector(({ lfo }: RootState) => lfo.frequency);
    const intensity = useSelector(({ lfo }: RootState) => lfo.intensity);
    const cutoff = useSelector(({ vcf }: RootState) => vcf.cutoff);
    const delayTime = useSelector(({ delay }: RootState) => delay.time);
    const feedback = useSelector(({ delay }: RootState) => delay.feedback);

    const onModeChange = useCallback(
        (value) => {
            dispatch(value === 'standby' ? turnOff() : turnOn());
            if (value !== 'standby') {
                dispatch(setLfoShape(value));
            }
        },
        [dispatch]
    );
    const onFrequencyChange = useCallback(
        ({ value }) => {
            dispatch(setLfoFrequency(value));
        },
        [dispatch]
    );
    const onIntensityChange = useCallback(
        ({ value }) => {
            dispatch(setLfoIntensity(value));
        },
        [dispatch]
    );
    const onCutoffChange = useCallback(
        ({ value }) => {
            dispatch(setVcfCutoff(value));
        },
        [dispatch]
    );
    const onDelayTimeChange = useCallback(
        ({ value }) => {
            dispatch(setDelayTime(value));
        },
        [dispatch]
    );
    const onFeedbackChange = useCallback(
        ({ value }) => {
            dispatch(setDelayFeedback(value));
        },
        [dispatch]
    );

    return (
        <Monotron
            mode={mode}
            onModeChange={onModeChange}
            frequency={frequency}
            onFrequencyChange={onFrequencyChange}
            cutoff={cutoff}
            onCutoffChange={onCutoffChange}
            delayTime={delayTime}
            onDelayTimeChange={onDelayTimeChange}
            feedback={feedback}
            onFeedbackChange={onFeedbackChange}
            intensity={intensity}
            onIntensityChange={onIntensityChange}
        />
    );
};

export default MonotronContainer;
