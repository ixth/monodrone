import { VFC } from 'react';

import Block from 'components/Block';
import Knob from 'components/Knob/controlled';
import Mode from 'components/Mode';
import Param from 'components/Param';
import AudioContainer from 'containers/Audio';
import MidiContainer from 'containers/Midi';
import RibbonContainer from 'containers/Ribbon';

import './styles/device.css';

interface PropTypes {
    mode: 'sawtooth' | 'square' | 'standby';
    onModeChange: (value: 'sawtooth' | 'square' | 'standby') => void;
    frequency: number;
    onFrequencyChange: (e: { value: number }) => void;
    intensity: number;
    onIntensityChange: (e: { value: number }) => void;
    cutoff: number;
    onCutoffChange: (e: { value: number }) => void;
    delayTime: number;
    onDelayTimeChange: (e: { value: number }) => void;
    feedback: number;
    onFeedbackChange: (e: { value: number }) => void;
}

const Monotron: VFC<PropTypes> = ({
    mode,
    onModeChange,
    frequency,
    onFrequencyChange,
    intensity,
    onIntensityChange,
    cutoff,
    onCutoffChange,
    delayTime,
    onDelayTimeChange,
    feedback,
    onFeedbackChange,
}) => (
    <div className="device">
        <div className="device__blocks">
            <AudioContainer />
            <MidiContainer />
            <Mode value={mode} onChange={onModeChange} />
            <Block title="LFO">
                <Param title="Rate" led>
                    <Knob value={frequency} onChange={onFrequencyChange} />
                </Param>
                <Param title="Int">
                    <Knob value={intensity} onChange={onIntensityChange} />
                </Param>
            </Block>
            <Block title="VCF">
                <Param title="Cutoff">
                    <Knob value={cutoff} onChange={onCutoffChange} />
                </Param>
            </Block>
            <Block title="Delay">
                <Param title="Time">
                    <Knob value={delayTime} onChange={onDelayTimeChange} />
                </Param>
                <Param title="Feedback">
                    <Knob value={feedback} onChange={onFeedbackChange} />
                </Param>
            </Block>
        </div>
        <div className="device__keyboard">
            <div className="device__keyboard-content">
                <RibbonContainer />
            </div>
        </div>
    </div>
);

export default Monotron;
